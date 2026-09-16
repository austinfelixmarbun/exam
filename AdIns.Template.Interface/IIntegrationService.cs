using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.Interface
{
    public interface IIntegrationService
    {
        Task SendToRabbitMqFanoutForTrxLogging(string keyCode, string exchangeName, object value);

        Task SendToRabbitMqDirectForTrxLogging(string keyCode, string exchangeName, string routingKey, object value);
    }
}
