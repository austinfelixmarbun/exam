using AdIns.Core.Filter;
using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using AdIns.Template.Interface.TrObService;
using AdIns.Template.Interface.TransactionService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AdIns.Template.API.Controllers.Agrmnt
{
    [ApiVersion("1")]
    [Route("v{X-Version:apiVersion}/[controller]")]
    [ApiController]
    [AllowAnonymous]
    [ValidateDTO]
    public class AgrmntController : ControllerBase
    {
        #region CONSTRUCTOR
        private readonly IAgrmntTrService iAgrmntTrService;
        private readonly IAgrmntTrObService iAgrmntTrObService;

        public AgrmntController(
            IAgrmntTrService iAgrmntTrService,
            IAgrmntTrObService iAgrmntTrObService) : base()
        {
            this.iAgrmntTrService = iAgrmntTrService;
            this.iAgrmntTrObService = iAgrmntTrObService;
        }
        #endregion

        #region QUERY
        [Route("searchAgreement")]
        [ProducesResponseType(200, Type = typeof(List<AgreementPagingResDto>))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> SearchAgreement(AgreementPagingReqDto req)
        {
            List<AgreementPagingResDto> result = await iAgrmntTrObService.SearchAgreement(req);
            return new JsonResult(result);
        }

        [Route("searchPendingAgreement")]
        [ProducesResponseType(200, Type = typeof(List<AgreementPagingResDto>))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> SearchPendingAgreement(AgreementPagingReqDto req)
        {
            List<AgreementPagingResDto> result = await iAgrmntTrObService.SearchPendingAgreement(req);
            return new JsonResult(result);
        }

        [Route("GetAgrmntDetail")]
        [ProducesResponseType(200, Type = typeof(AgrmntDetailResDto))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> GetAgrmntDetail([FromBody] long agrmntId)
        {
            AgrmntDetailResDto result = await iAgrmntTrObService.GetAgrmntDetail(agrmntId);
            return new JsonResult(result);
        }
        #endregion

        #region TRANSACTION
        [Route("AddAgrmnt")]
        [ProducesResponseType(200, Type = typeof(AddAgrmntResDto))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> AddAgrmnt(AddAgrmntReqDto req)
        {
            AddAgrmntResDto result = await iAgrmntTrService.AddAgrmnt(req);
            return new JsonResult(result);
        }

        [Route("AddAgrmntAsset")]
        [ProducesResponseType(200, Type = typeof(AddAgrmntAssetResDto))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> AddAgrmntAsset(AddAgrmntAssetReqDto req)
        {
            AddAgrmntAssetResDto result = await iAgrmntTrService.AddAgrmntAsset(req);
            return new JsonResult(result);
        }

        [Route("SimulasiAngsuran")]
        [ProducesResponseType(200, Type = typeof(SimulasiAngsuranResDto))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> SimulasiAngsuran(SimulasiAngsuranReqDto req)
        {
            SimulasiAngsuranResDto result = await iAgrmntTrService.SimulasiAngsuran(req);
            return new JsonResult(result);
        }

        [Route("CompleteAgrmnt")]
        [ProducesResponseType(200, Type = typeof(CompleteAgrmntResDto))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> CompleteAgrmnt(CompleteAgrmntReqDto req)
        {
            CompleteAgrmntResDto result = await iAgrmntTrService.CompleteAgrmnt(req);
            return new JsonResult(result);
        }

        [Route("CreditApproval")]
        [ProducesResponseType(200, Type = typeof(CreditApprovalResDto))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> CreditApproval(CreditApprovalReqDto req)
        {
            CreditApprovalResDto result = await iAgrmntTrService.CreditApproval(req);
            return new JsonResult(result);
        }
        #endregion
    }
}
