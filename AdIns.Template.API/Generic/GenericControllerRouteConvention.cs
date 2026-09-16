
using AdIns.Core.GenericApi.Attributes;
using AdIns.Util.Setting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Reflection;

namespace AdIns.Template.API.Generic
{
    /// <summary>
    /// 
    /// </summary>
    public class GenericControllerRouteConvention : IControllerModelConvention
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="controller"></param>
        public void Apply(ControllerModel controller)
        {
            if (controller.ControllerType.IsGenericType)
            {
                var genericType = controller.ControllerType.GenericTypeArguments[0];
                var customNameAttribute = genericType.GetCustomAttribute<GeneratedControllerAttribute>();

                if (customNameAttribute?.Route != null)
                {
                    controller.Selectors.Add(new SelectorModel
                    {
                        AttributeRouteModel = new AttributeRouteModel(new RouteAttribute(customNameAttribute.Route)),
                    });
                }
            }
            else if (controller.ControllerName == "BasePaging")
            {
                foreach (var paging in GetAvailablePaging())
                {
                    var routeModel = new SelectorModel
                    {
                        AttributeRouteModel = new AttributeRouteModel(new RouteAttribute(paging))
                    };

                    controller.Actions[0].Selectors.Add(routeModel);
                }
                controller.Actions[0].Selectors.RemoveAt(0);
            }
            else if (controller.ControllerName == "BaseView")
            {
                foreach (var paging in GetAvailableView())
                {
                    var routeModel = new SelectorModel
                    {
                        AttributeRouteModel = new AttributeRouteModel(new RouteAttribute(paging))
                    };

                    controller.Actions[0].Selectors.Add(routeModel);
                }
                controller.Actions[0].Selectors.RemoveAt(0);
            }
        }

        private static IEnumerable<string> GetAvailableView()
        {
            string DataBaseType = AppConfiguration.AppSetting["ConnectionStrings:PostgreSql:DataBaseType"];
            string jsonData;

            if (DataBaseType.ToUpper() == "POSTGRESQL")
                jsonData = System.IO.File.ReadAllText("queryviewpostgre.json");
            else
                jsonData = System.IO.File.ReadAllText("queryview.json");

            List<string> queryPagingNames = new List<string>();
            if (!string.IsNullOrWhiteSpace(jsonData))
            {
                dynamic stuff = JsonConvert.DeserializeObject(jsonData);
                var ListqueryPaging = stuff.QueryString;
                foreach (JProperty a in ListqueryPaging)
                {
                    queryPagingNames.Add(a.Name);
                }
            }

            return queryPagingNames;
        }

        private static IEnumerable<string> GetAvailablePaging()
        {
            string DataBaseType = AppConfiguration.AppSetting["ConnectionStrings:PostgreSql:DataBaseType"];
            string jsonData;

            if (DataBaseType.ToUpper() == "POSTGRESQL")
                jsonData = System.IO.File.ReadAllText("querypagingpostgre.json");
            else
                jsonData = System.IO.File.ReadAllText("querypaging.json");

            List<string> queryPagingNames = new List<string>();
            if (!string.IsNullOrWhiteSpace(jsonData))
            {
                dynamic stuff = JsonConvert.DeserializeObject(jsonData);
                var ListqueryPaging = stuff.QueryString;
                foreach (JProperty a in ListqueryPaging)
                {
                    queryPagingNames.Add(a.Name);
                }
            }
            return queryPagingNames;
        }
    }
}
