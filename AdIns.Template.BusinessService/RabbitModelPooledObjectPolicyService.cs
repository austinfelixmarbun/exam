using AdIns.DataModel.RabbitMQ;
using AdIns.Util.Setting;
using Microsoft.Extensions.ObjectPool;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.BusinessService
{
    public class RabbitModelPooledObjectPolicyService : IPooledObjectPolicy<IModel>
    {
        private readonly RabbitOptions _options;
        private readonly IConnection _connection;

        public RabbitModelPooledObjectPolicyService(IOptions<RabbitOptions> optionsAccs)
        {
            _options = optionsAccs.Value;
            bool.TryParse(AppConfiguration.AppSetting["Queue:IsUseIntegration"], out bool QueueConn);
            if (QueueConn)
                _connection = GetConnection();
            else
                _connection = null;

        }

        private IConnection GetConnection()
        {
            var factory = new ConnectionFactory()
            {
                HostName = _options.HostName,
                UserName = _options.UserName,
                Password = _options.Password,
                Port = _options.Port,
                VirtualHost = _options.VHost,

                #region Recovery From Network Failures RabbitMQ
                AutomaticRecoveryEnabled = true, // enable automatic recovery connection  
                TopologyRecoveryEnabled = true, // enable automatic recovery topology (exchanges, queues, bindings) 
                NetworkRecoveryInterval = TimeSpan.FromSeconds(60), // pengaturan batas waktu client menunggu sebelum mencoba memulihkan koneksi
                RequestedHeartbeat = TimeSpan.FromSeconds(60), // mendefinisikan heartbeat timeout/ periode waktu second dimana koneksi TCP sudah tidak dapat dijangkau oleh RabbitMQ dan client (publisher dan consumer)
                RequestedConnectionTimeout = TimeSpan.FromSeconds(60) // pengaturan batas waktu untuk upaya koneksi dalam ms (600000 ms => 600 s => 10 menit)
                #endregion
            };

            return factory.CreateConnection();
        }

        public IModel Create()
        {
            return _connection.CreateModel();
        }

        public bool Return(IModel obj)
        {
            if (obj.IsOpen)
            {
                return true;
            }
            else
            {
                obj?.Dispose();
                return false;
            }
        }

    }
}
