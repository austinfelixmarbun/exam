using AdIns.Core.GenericApi.Dto;
using AdIns.Core.GenericApi;
using AdIns.Core.GenericApi.Attributes;
using AdIns.Template.DTO.GenericObj;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using AdIns.Foundation.DTO.Response.Generic;
using ResponseGenericListObj = AdIns.Foundation.DTO.Response.Generic.ResponseGenericListObj;

namespace AdIns.Template.Controllers.Generic
{
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class BaseController<T> : ControllerBase where T : class
    {
        private readonly IGenericApiService<T> _svc;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="svc"></param>
        public BaseController(IGenericApiService<T> svc)
        {
            _svc = svc;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("GetAll")]
        [HttpPost]
        public async Task<List<T>> GetAll()
        {
            return await _svc.GetAll();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReq"></param>
        /// <returns></returns>
        [Route("GetObjectByPrimaryKey")]
        [HttpPost]
        public async Task<T> GetObjectByPrimaryKey(ReqByIdWithIncludeObj objReq)
        {
            return await _svc.GetObjectByPrimaryKey(objReq.Id, objReq.IncludeProperties, false);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReq"></param>
        /// <returns></returns>
        [Route("GetObjectByUniqueNo")]
        [HttpPost]
        public async Task<T> GetObjectByUniqueNo(ReqByTrxNoWithIncludeObj objReq)
        {
            return await _svc.GetObjectByUniqueNo(objReq.TrxNo, objReq.IncludeProperties, false);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReq"></param>
        /// <returns></returns>
        [Route("SendObjectToRmqByUniqueNo")]
        [HttpPost]
        public async Task<JsonResult> SendObjectToRmqByUniqueNo(ReqSendObjectToRmqByUniqueNoObj objReq)
        {
            await _svc.SendObjectToRmqByUniqueNo(objReq.TrxNo, objReq.ExchangeName, objReq.MappingCode, objReq.IncludeProperties);
            return new JsonResult(new ResponseSuccessObj());
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReq"></param>
        /// <returns></returns>
        [Route("ValidateUniqueNoExist")]
        [HttpPost]
        public async Task<bool> ValidateUniqueNoExist(ReqByTrxNoObj objReq)
        {
            return await _svc.ValidateUniqueNoExist(objReq.TrxNo);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("GetListParam")]
        [HttpPost]
        public dynamic GetListParam()
        {
            var Properties = typeof(T).GetProperties(BindingFlags.DeclaredOnly |
                               BindingFlags.Public |
                               BindingFlags.Instance);


            dynamic exo = new System.Dynamic.ExpandoObject();
            foreach (var prop in Properties)
            {
                ((IDictionary<String, Object>)exo).Add(prop.Name,
                    new ResGenericParamObj(prop.PropertyType.Name, System.Nullable.GetUnderlyingType(prop.PropertyType) != null, prop.GetCustomAttributes<KeyAttribute>().Any(), prop.GetCustomAttributes<UniqueTrxNoAttribute>().Any()));
            }

            return exo;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReq"></param>
        /// <returns></returns>
        [Route("AddEditObj")]
        [HttpPost]
        public async Task<dynamic> AddEditObj(T objReq)
        {
            T obj = await _svc.AddEditObj(objReq, true);


            var Properties = typeof(T).GetProperties(BindingFlags.DeclaredOnly |
                               BindingFlags.Public |
                               BindingFlags.Instance);


            dynamic exo = new System.Dynamic.ExpandoObject();

            foreach (var prop in Properties)
            {
                ((IDictionary<String, Object>)exo).Add(prop.Name, obj.GetType().GetProperty(prop.Name).GetValue(obj));
            }

            return exo;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReq"></param>
        /// <returns></returns>
        [Route("UpdateObjForApproval")]
        [HttpPost]
        public async Task<ActionResult> UpdateObjForApproval(ReqUpdateGeneral objReq)
        {
            bool isSuccess = await _svc.UpdateObjForApproval(objReq);

            return new JsonResult(new ResponseSuccessObj());
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReq"></param>
        /// <returns></returns>
        [Route("DeleteObjByPrimaryKey")]
        [HttpPost]
        public async Task<JsonResult> DeleteObjByPrimaryKey(ReqByIdObj objReq)
        {
            await _svc.DeleteObjByPrimaryKey(objReq.Id, true);
            return new JsonResult(new ResponseSuccessObj());
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReqs"></param>
        /// <returns></returns>
        [Route("GetListObjectByListKeyAndValue")]
        [HttpPost]
        public async Task<List<T>> GetListObjectByListKeyAndValue(ListKeyAndValueWithIncludeObj objReqs)
        {
            return await _svc.GetListObjectByListKeyAndValue(objReqs.ListKeyValue, objReqs.IncludeProperties, false);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReqs"></param>
        /// <returns></returns>
        [Route("GetObjectByListKeyAndValue")]
        [HttpPost]
        public async Task<T> GetObjectByListKeyAndValue(ListKeyAndValueWithIncludeObj objReqs)
        {
            return await _svc.GetObjectByListKeyAndValue(objReqs.ListKeyValue, objReqs.IncludeProperties, false);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReq"></param>
        /// <returns></returns>
        [Route("GetObjectByKeyAndValue")]
        [HttpPost]
        public async Task<T> GetObjectByKeyAndValue(ReqKeyAndValueObj objReq)
        {
            return await _svc.GetObjectByKeyAndValue(objReq.Key, objReq.Operator, objReq.Value, objReq.IncludeProperties, false);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReq"></param>
        /// <returns></returns>
        [Route("GetListObjectByKeyAndValue")]
        [HttpPost]
        public async Task<JsonResult> GetListObjectByKeyAndValue(ReqKeyAndValueObj objReq)
        {
            var data = await _svc.GetListObjectByKeyAndValue(objReq.Key, objReq.Operator, objReq.Value, objReq.IncludeProperties, false);
            ResponseGenericListObj response = new();
            response.ReturnObject = data;
            return new JsonResult(response);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReq"></param>
        /// <returns></returns>
        [Route("UpdateObjForCancelation")]
        [HttpPost]
        public async Task<ActionResult> UpdateObjForCancelation(ReqUpdateGeneral objReq)
        {
            await _svc.UpdateObjForCancelation(objReq);
            return new JsonResult(new ResponseSuccessObj());
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReq"></param>
        /// <returns></returns>
        [Route("UpdateInExecProcessandSendToRmq")]
        [HttpPost]
        public async Task<JsonResult> UpdateInExecProcessandSendToRmq(ReqByTrxNoWithIncludeAndRmqObj objReq)
        {
            await _svc.UpdateInExecProcessandSendToRmq(objReq.TrxNo, objReq.ColumnName, objReq.ExchangeName, objReq.MappingCode, objReq.IncludeProperties);
            return new JsonResult(new ResponseSuccessObj());
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReq"></param>
        /// <returns></returns>
        [Route("UpdateInCancelProcessandSendToRmq")]
        [HttpPost]
        public async Task<JsonResult> UpdateInCancelProcessandSendToRmq(ReqByTrxNoWithIncludeAndRmqObj objReq)
        {
            await _svc.UpdateInCancelProcessandSendToRmq(objReq.TrxNo, objReq.ColumnName, objReq.ExchangeName, objReq.MappingCode, objReq.IncludeProperties);
            return new JsonResult(new ResponseSuccessObj());
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReq"></param>
        /// <returns></returns>
        [Route("ReserveJournalNo")]
        [HttpPost]
        public async Task<JsonResult> ReserveJournalNo(ReqGenericReserveJournalObj objReq)
        {
            await _svc.ReserveJournalNo(objReq.TransactionNo, objReq.ColumnName, objReq.TrxCodeJournal);
            return new JsonResult(new ResponseSuccessObj());
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="objReq"></param>
        /// <returns></returns>
        [Route("SendObjectToRmqByKeyAndValue")]
        [HttpPost]
        public async Task<JsonResult> SendObjectToRmqByKeyAndValue(ReqSendTrxNoMapByUniqueNoObj objReq)
        {
            await _svc.SendObjectToRmqByKeyAndValue(objReq.Key, objReq.Operator, objReq.Value, objReq.ExchangeName, objReq.IntMapCode, objReq.IncludeProperties);
            return new JsonResult(new ResponseSuccessObj());
        }
    }
}
