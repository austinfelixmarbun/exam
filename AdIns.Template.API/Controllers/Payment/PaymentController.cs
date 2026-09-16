using AdIns.Core.Filter;
using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using AdIns.Template.Interface.TrObService;
using AdIns.Template.Interface.TransactionService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AdIns.Template.API.Controllers.Payment
{
    [ApiVersion("1")]
    [Route("v{X-Version:apiVersion}/[controller]")]
    [ApiController]
    [AllowAnonymous]
    [ValidateDTO]
    public class PaymentController : ControllerBase
    {
        #region CONSTRUCTOR
        private readonly IPaymentTrService iPaymentTrService;
        private readonly IPaymentTrObService iPaymentTrObService;

        public PaymentController(
            IPaymentTrService iPaymentTrService,
            IPaymentTrObService iPaymentTrObService) : base()
        {
            this.iPaymentTrService = iPaymentTrService;
            this.iPaymentTrObService = iPaymentTrObService;
        }
        #endregion

        #region QUERY
        [Route("searchActiveAgreement")]
        [ProducesResponseType(200, Type = typeof(List<SearchActiveAgrmntResDto>))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> SearchActiveAgreement(AgreementPagingReqDto req)
        {
            List<SearchActiveAgrmntResDto> result = await iPaymentTrObService.SearchActiveAgreement(req);
            return new JsonResult(result);
        }

        [Route("viewAgreement")]
        [ProducesResponseType(200, Type = typeof(PaymentViewAgreementResDto))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> ViewAgreement([FromBody] string agrmntNo)
        {
            PaymentViewAgreementResDto result = await iPaymentTrObService.ViewAgreement(agrmntNo);
            return new JsonResult(result);
        }
        #endregion

        #region TRANSACTION
        [Route("InputPayment")]
        [ProducesResponseType(200, Type = typeof(InputPaymentResDto))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> InputPayment(InputPaymentReqDto req)
        {
            InputPaymentResDto result = await iPaymentTrService.InputPayment(req);
            return new JsonResult(result);
        }
        #endregion
    }
}
