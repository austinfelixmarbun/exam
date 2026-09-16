using AdIns.Core.Service;
using AdIns.DataAccess;
using AdIns.DataModel.Generic;
using AdIns.Exp.ExceptionCustomType;
using AdIns.Foundation.DTO.Report;
using AdIns.Template.Common;
using AdIns.Template.DataAccess.Context;
using AdIns.Template.Interface;
using AdIns.Util.Extensions;
using AdIns.Util.HttpClientManager;
using AdIns.Util.Setting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.BusinessService
{

    public class IntegrationService : BaseService, IIntegrationService
    {
        private readonly TemplateContext context;
        private readonly IRepository repository;
        private readonly IConfiguration iConfiguration;
        private readonly IRabbitManagerService iRabbitManagerService;
        public IntegrationService(TemplateContext context, IHttpContextAccessor iHttpContextAccessor, Func<BaseDbContext, IRepository> repository, IRabbitManagerService iRabbitManagerService) : base(iHttpContextAccessor)
        {
            this.context = context;
            this.repository = repository(context);
            this.iRabbitManagerService = iRabbitManagerService;
        }

        public virtual async Task SendToRabbitMqFanoutForTrxLogging(string keyCode, string exchangeName, object value)
        {
            KeyValueObj keyValueObj = new KeyValueObj
            {
                Key = keyCode,
                Value = value
            };
            iRabbitManagerService.Publish(keyValueObj, exchangeName, "fanout", "");
        }

        public virtual async Task SendToRabbitMqDirectForTrxLogging(string keyCode, string exchangeName, string routingKey, object value)
        {
            KeyValueObj keyValueObj = new KeyValueObj
            {
                Key = keyCode,
                Value = value
            };
            iRabbitManagerService.Publish(keyValueObj, exchangeName, "direct", routingKey);
        }

        

       
    }
}
