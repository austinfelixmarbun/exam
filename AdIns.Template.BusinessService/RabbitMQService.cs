using AdIns.Util.Log;
using AdIns.Util.Setting;
using NLog;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.Exceptions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;

namespace AdIns.Prototype.BusinessService.Journal
{
    public enum ConnectionType
    {
        PUBLISHER,
        CONSUMER
    }

    public class RabbitMQService
    {
        #region Public Event Handler
        public AsyncEventHandler<ConsumerEventArgs> Registered { get; set; }
        public AsyncEventHandler<ConsumerEventArgs> Unregistered { get; set; }
        public AsyncEventHandler<BasicDeliverEventArgs> Received { get; set; }
        public AsyncEventHandler<ConsumerEventArgs> ConsumerCancelled { get; set; }
        public AsyncEventHandler<ShutdownEventArgs> Shutdown { get; set; }
        #endregion

        #region RMQ Connection & Event Handler
        private IBasicProperties BasicProperties { get; set; }
        private AsyncEventingBasicConsumer ConsumerEventHandler { get; set; }
        private IConnection PublisherConnection { get; set; }
        private IModel PublisherModel { get; set; }
        private IConnection ConsumerConnection { get; set; }
        private IModel ConsumerModel { get; set; }
        #endregion

        #region RMQ Properties
        private int MaxPriority { get; set; }
        private int ConsumerPriority { get; set; }
        private double RecoveryInterval { get; set; }
        private double HeartBeatTimeout { get; set; }
        private double ConnectionTimeout { get; set; }
        private string Username { get; set; }
        private string Password { get; set; }
        private string VirtualHostName { get; set; }
        private string Endpoints { get; set; }
        private int Port { get; set; }

        #endregion

        #region Connection State
        public bool IsPublisherConnected => PublisherConnection != null && PublisherConnection.IsOpen;
        public bool IsConsumerConnected => ConsumerConnection != null && ConsumerConnection.IsOpen;
        #endregion

        private static readonly Logger logger = NLogLogger.ConfigureLog().GetCurrentClassLogger();

        public RabbitMQService()
        {
            string RecoveryIntervalStr = AppConfiguration.AppSetting["RMQSettings:RMQHeartbeat:RecoveryInterval"].ToString();
            string HeartBeatTimeoutStr = AppConfiguration.AppSetting["RMQSettings:RMQHeartbeat:HeartBeatTimeout"].ToString();
            string ConnectionTimeoutStr = AppConfiguration.AppSetting["RMQSettings:RMQHeartbeat:ConnectionTimeout"].ToString();

            string MaxPriorityStr = AppConfiguration.AppSetting["RMQSettings:RMQConnect:MaxPriority"].ToString();
            string ConsumerPriorityStr = AppConfiguration.AppSetting["RMQSettings:RMQConnect:ConsumerPriority"].ToString();
            string PortStr = AppConfiguration.AppSetting["RMQSettings:RMQConnect:Port"].ToString();

            Username = AppConfiguration.AppSetting["RMQSettings:RMQConnect:Username"].ToString();
            Password = AppConfiguration.AppSetting["RMQSettings:RMQConnect:Password"].ToString();
            Endpoints = AppConfiguration.AppSetting["RMQSettings:RMQConnect:Endpoints"].ToString();
            VirtualHostName = AppConfiguration.AppSetting["RMQSettings:RMQConnect:VirtualHostName"].ToString();
            MaxPriority = string.IsNullOrEmpty(MaxPriorityStr) ? 5 : Convert.ToInt32(MaxPriorityStr);
            ConsumerPriority = string.IsNullOrEmpty(ConsumerPriorityStr) ? 5 : Convert.ToInt32(ConsumerPriorityStr);
            Port = string.IsNullOrEmpty(PortStr) ? 0 : Convert.ToInt32(PortStr);

            RecoveryInterval = string.IsNullOrEmpty(RecoveryIntervalStr) ? 60 : Convert.ToDouble(RecoveryIntervalStr);
            HeartBeatTimeout = string.IsNullOrEmpty(HeartBeatTimeoutStr) ? 60 : Convert.ToDouble(HeartBeatTimeoutStr);
            ConnectionTimeout = string.IsNullOrEmpty(ConnectionTimeoutStr) ? 60 : Convert.ToDouble(ConnectionTimeoutStr);
        }

        #region Connect & Disconnect RMQ
        private void Connect(ConnectionType connType, string vHost = "")
        {
            ConnectionFactory factory = new ConnectionFactory();
            factory.UserName = Username;
            factory.Password = Password;
            factory.VirtualHost = string.IsNullOrEmpty(vHost) ? VirtualHostName : vHost;
            factory.Port = Port;

            #region Recovery From Network Failures RabbitMQ
            factory.DispatchConsumersAsync = true;
            factory.AutomaticRecoveryEnabled = true; // enable automatic recovery connection  
            factory.TopologyRecoveryEnabled = true; // enable automatic recovery topology (exchanges, queues, bindings) 
            factory.NetworkRecoveryInterval = TimeSpan.FromSeconds(RecoveryInterval); // pengaturan batas waktu client menunggu sebelum mencoba memulihkan koneksi
            factory.RequestedHeartbeat = TimeSpan.FromSeconds(HeartBeatTimeout); // mendefinisikan heartbeat timeout/ periode waktu second dimana koneksi TCP sudah tidak dapat dijangkau oleh RabbitMQ dan client (publisher dan consumer)
            factory.RequestedConnectionTimeout = TimeSpan.FromSeconds(ConnectionTimeout); // pengaturan batas waktu untuk upaya koneksi dalam ms (600000 ms => 600 s => 10 menit)

            string anotherNode = Endpoints;
            char[] separator = { ';' };
            String[] nodes = anotherNode.Split(separator);

            IList<AmqpTcpEndpoint> endpoints = new List<AmqpTcpEndpoint>();

            foreach (string node in nodes)
            {
                AmqpTcpEndpoint endpoint = new AmqpTcpEndpoint(node);
                endpoints.Add(endpoint);
            }
            #endregion

            try
            {
                if (connType == ConnectionType.PUBLISHER)  // For create publisher connection
                {
                    PublisherConnection = factory.CreateConnection(endpoints);
                }
                else // For create consumer connection
                {
                    ConsumerConnection = factory.CreateConnection(endpoints);
                }
            }
            catch (BrokerUnreachableException ex)
            {
                // apply retry logic
                bool successRetryConn = false;
                int countRetryConn = 3;
                do
                {
                    logger.Info("Wait 1 seconds for retry connection.....");
                    Thread.Sleep(1000);
                    logger.Info("Retry connection " + countRetryConn + " from 3.");
                    try
                    {
                        if (connType == ConnectionType.PUBLISHER)  // For create publisher connection
                        {
                            PublisherConnection = factory.CreateConnection(endpoints);
                            successRetryConn = true;
                        }
                        else// For create consumer connection
                        {
                            ConsumerConnection = factory.CreateConnection(endpoints);
                            successRetryConn = true;
                        }
                    }
                    catch (Exception)
                    {
                        successRetryConn = false;
                        countRetryConn--;
                    }

                    if (successRetryConn) break;

                } while (!successRetryConn && countRetryConn != 0);

                if (!successRetryConn)
                {
                    logger.Error("Failed retry connection....");
                    logger.Error("Not connected to RabbitMQ Server or None of the specified endpoints were reachable.Detail: "
                          + ex.ToString()
                          + ex.InnerException != null ? " => Inner Exception: " + ex.InnerException.Message : "");
                }
            }
            catch (ConnectFailureException exConnectionFailure)
            {
                logger.Error(exConnectionFailure.ToString());
            }
        }
        public void Disconnect(ConnectionType connType)
        {
            if (connType == ConnectionType.PUBLISHER) // For Publisher
            {
                if (PublisherModel != null)
                {
                    PublisherModel.Close();
                    PublisherModel = null;
                }

                if (PublisherConnection != null)
                {
                    try
                    {
                        PublisherConnection.Close();
                    }
                    catch (EndOfStreamException)
                    {
                        PublisherConnection.Abort();
                    }
                    finally
                    {
                        PublisherConnection = null;
                    }
                }
            }
            else // For Consumer
            {
                if (ConsumerModel != null)
                {
                    ConsumerModel.Close();
                    ConsumerModel = null;
                }

                if (ConsumerConnection != null)
                {
                    try
                    {
                        ConsumerConnection.Close();
                    }
                    catch (EndOfStreamException)
                    {
                        PublisherConnection.Abort();
                    }
                    finally
                    {
                        ConsumerConnection = null;
                    }
                }
            }
        }
        #endregion

        #region Publish & Consume Configuration
        public void ConfigureConsumerModel()
        {
            //ConsumerEventHandler = new EventingBasicConsumer(ConsumerModel);
            ConsumerEventHandler = new AsyncEventingBasicConsumer(ConsumerModel);
            ConsumerEventHandler.Registered += Registered;
            ConsumerEventHandler.Received += Received;
            ConsumerEventHandler.Unregistered += Unregistered;
            ConsumerEventHandler.ConsumerCancelled += ConsumerCancelled;
            ConsumerEventHandler.Shutdown += Shutdown;
        }
        public void CreateBasicProperties(string contentType, string messageType, byte priority)
        {
            IBasicProperties basicProperties = PublisherModel.CreateBasicProperties();
            basicProperties.Persistent = true;
            basicProperties.Priority = priority;
            basicProperties.ContentType = contentType;
            basicProperties.Type = messageType;

            BasicProperties = basicProperties;
        }
        #endregion

        #region Create Publisher & Consumer Model
        public void CreatePublisherModel(string vHost = "", string queueName = "", Dictionary<string, object> queueArgs = null)
        {
            if (!IsPublisherConnected)
            {
                try
                {
                    Connect(ConnectionType.PUBLISHER, vHost);
                }
                catch (Exception ex)
                {
                    logger.Error(ex.ToString());
                }
            }

            if (PublisherModel == null || PublisherModel.IsClosed)
            {
                PublisherModel = PublisherConnection.CreateModel();

                PublisherModel.QueueDeclare(queue: queueName,
                                    durable: true,
                                    exclusive: false,
                                    autoDelete: false,
                                    arguments: queueArgs);
            }
        }

        public void CreateConsumerModel(string vHost = "", string queueName = "", Dictionary<string, object> queueArgs = null, Int16 ConcurrentTaskLimit = 4)
        {
            if (!IsConsumerConnected)
            {
                try
                {
                    Connect(ConnectionType.CONSUMER, vHost);
                }
                catch (Exception ex)
                {
                    logger.Error(ex.ToString());
                }
            }

            if (ConsumerModel == null || ConsumerModel.IsClosed)
            {
                ConsumerModel = ConsumerConnection.CreateModel();
                ConsumerModel.BasicQos(prefetchSize: 0,
                                  prefetchCount: (ushort)ConcurrentTaskLimit,
                                  global: false);

                ConsumerModel.QueueDeclare(queue: queueName,
                                    durable: true,
                                    exclusive: false,
                                    autoDelete: false,
                                    arguments: queueArgs);
            }
        }
        #endregion

        #region Publish & Consume Message
        public void BasicPublish(string exchange, string routingKey, ReadOnlyMemory<byte> body)
        {
            PublisherModel.BasicPublish(exchange, routingKey, BasicProperties, body);
        }

        public void BasicConsume(string queue, Dictionary<string, object> queueArgs = null)
        {
            ConsumerModel.BasicConsume(queue, false, string.Empty, queueArgs, ConsumerEventHandler);
        }
        #endregion

        #region BasicCancel
        public void BasicCancel(string consumerTag = "")
        {
            if (consumerTag == "")
                ConsumerModel.BasicCancel(string.Empty);
            else
                ConsumerModel.BasicCancel(consumerTag);
        }
        #endregion

        #region BasicReject for reject message and requeue message
        public void BasicReject(ulong deliveryTag, bool requeue = false)
        {
            ConsumerModel.BasicReject(deliveryTag, requeue);
        }
        #endregion

        #region Check for Message in Queue
        public bool IsQueueEmpty(string queue)
        {
            return ConsumerModel.MessageCount(queue) <= 0;
        }
        #endregion

        public void AcknowledgeMessage(ulong deliveryTag)
        {
            //test
            if (IsConsumerConnected)
            {
                try
                {
                    ConsumerModel.BasicAck(
                        deliveryTag: deliveryTag,
                        multiple: false
                    ); // Acknowledge satu atau lebih message yang disampaikan.
                }
                catch (Exception ex)
                {
                    logger.Error(ex.ToString());
                }
            }
        }
    }
}
