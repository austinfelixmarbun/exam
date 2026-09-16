using AdIns.Core.Filter;
using AdIns.Core.Service;
using AdIns.DataModel.Query;
using AdIns.Foundation.DTO.Paging;
using AdIns.Foundation.DTO.Response.Generic;
using AdIns.Util;
using AdIns.Util.Setting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Threading.Tasks;

namespace AdIns.Template.API.Controllers.Generic
{
    [ApiVersion("1")]
    [ApiVersion("2.1")]
    [Route("v{X-Version:apiVersion}/[controller]")]
    [ApiController]
    public class GenericController : ControllerBase
    {
        #region Constructor
        IGenericService iGenericService;


        /// <summary>
        /// Generic Constructor
        /// </summary>
        /// <param name="iGenericService">Generic API/\
        /// </param>
        public GenericController(IGenericService iGenericService)
            : base()
        {
            this.iGenericService = iGenericService;
        }
        #endregion

        #region QueryPaging
        /// <summary>
        /// To Get Paging Object Using spQueryPaging_Generic
        /// </summary>
        /// <param name="genericPagingObj"></param>
        /// <returns></returns>
        [Route("GetPagingObjectBySQL")]
        [HttpPost]
        [ValidateDTO]
        [AllowAnonymous]
        [MapToApiVersion("1.0")]
        public async Task<JsonResult> GetPagingObjectBySQL(GenericPagingObj genericPagingObj)
        {
            Console.WriteLine("123");
            string connString = string.Empty;
            PagingResult pagingResult = new PagingResult();
            string DataBaseType = AppConfiguration.AppSetting["ConnectionStrings:PostgreSql:DataBaseType"];
            if (DataBaseType == "POSTGRESQL")
            {
                connString = AppConfiguration.AppSetting["ConnectionStrings:PostgreSql:DataBasePostgreSQL"];
                pagingResult = iGenericService.GetPagingObjectByNpgSQLCommand(genericPagingObj, connString);

            }
            else
            {
                connString = AppConfiguration.AppSetting["ConnectionStrings:Template:SQLConnSP"];
                pagingResult = await iGenericService.GetPagingObjectBySQLAsync(genericPagingObj, connString);
            }

            return new JsonResult(pagingResult);
        }
        #endregion

        #region "GET"
        /// <summary>
        /// To Get Object Using spGet_DataViewGenericAsync
        /// </summary>
        /// <param name="genericViewObj"></param>
        /// <returns></returns>
        [Route("GetDataViewBySQL")]
        [HttpPost]
        [ValidateDTO]
        [MapToApiVersion("1.0")]
        public async Task<JsonResult> GetDataViewBySQL(GenericViewObj genericViewObj)
        {
            string connString = string.Empty;
            PagingResult pagingResult = new PagingResult();
            string DataBaseType = AppConfiguration.AppSetting["ConnectionStrings:PostgreSql:DataBaseType"];
            if (DataBaseType == "POSTGRESQL")
            {
                connString = AppConfiguration.AppSetting["ConnectionStrings:PostgreSql:DataBasePostgreSQL"];
                DataTable dt = await iGenericService.GetDataViewByNpgSQLAsync(genericViewObj, connString);
                pagingResult.Data = dt;
            }
            else
            {
                connString = AppConfiguration.AppSetting["ConnectionStrings:Template:SQLConnSP"];
                DataTable dt = await iGenericService.GetDataViewBySQLAsync(genericViewObj, connString);
                pagingResult.Data = dt;
            }


            return new JsonResult(pagingResult);
        }
        #endregion

        #region ADD EDIT DELETE
        /// <summary>
        /// To Add Object Using SQL Command
        /// </summary>
        /// <param name="querySQLObj"></param>
        /// <returns></returns>
        [Route("AddObjectBySQL")]
        [HttpPost]
        [ValidateDTO]
        [MapToApiVersion("1.0")]
        public async Task<JsonResult> AddObjectBySQL(QuerySQLObj querySQLObj)
        {
            string connString = AppConfiguration.AppSetting["ConnectionStrings:Template:SQLConnSP"];
            await iGenericService.AddObjectBySQLAsync(querySQLObj, connString);
            ResponseSuccessObj responseSuccessObj = new ResponseSuccessObj();
            return new JsonResult(responseSuccessObj);
        }

        /// <summary>
        /// To Update Object Using SQL Command
        /// </summary>
        /// <param name="querySQLObj"></param>
        /// <returns></returns>
        [Route("UpdateObjectBySQL")]
        [HttpPost]
        [ValidateDTO]
        [MapToApiVersion("1.0")]
        public async Task<JsonResult> UpdateObjectBySQL(QuerySQLObj querySQLObj)
        {
            string connString = AppConfiguration.AppSetting["ConnectionStrings:Template:SQLConnSP"];
            await iGenericService.UpdateObjectBySQLAsync(querySQLObj, connString);
            ResponseSuccessObj responseSuccessObj = new ResponseSuccessObj();
            return new JsonResult(responseSuccessObj);
        }

        /// <summary>
        /// To Delete Object Using SQL Command
        /// </summary>
        /// <param name="querySQLObj"></param>
        /// <returns></returns>
        [Route("DeleteObjectBySQL")]
        [HttpPost]
        [ValidateDTO]
        [MapToApiVersion("1.0")]
        public async Task<JsonResult> DeleteObjectBySQL(QuerySQLObj querySQLObj)
        {
            string connString = AppConfiguration.AppSetting["ConnectionStrings:Template:SQLConnSP"];
            await iGenericService.DeleteObjectBySQLAsync(querySQLObj, connString);
            ResponseSuccessObj responseSuccessObj = new ResponseSuccessObj();
            return new JsonResult(responseSuccessObj);
        }
        #endregion

        #region QryPaging
        /// <summary>
        /// To Get Paging Object Using spQueryPaging_Generic
        /// </summary>
        /// <param name="genericPagingObj"></param>
        /// <returns></returns>
        [Route("GetPagingObjectBySQL")]
        [MapToApiVersion("2.1")]
        [HttpPost]
        [AllowAnonymous]
        [ValidateDTO]
        public async Task<JsonResult> GetPagingObjectBySQL(GenericPagingObjDataTable_V2_1 genericPagingObj)
        {
            string connString = AppConfiguration.AppSetting["ConnectionStrings:Template:SQLConnS"];
            GenericSvc gen = new GenericSvc();
            PagingResult pagingResult = await gen.GetPagingObjectBySQLAsync(genericPagingObj, connString);
            return new JsonResult(pagingResult);
        }
        #endregion
    }
}