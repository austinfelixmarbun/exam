using AdIns.Core.Filter;
using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using AdIns.Template.Interface.TrObService;
using AdIns.Template.Interface.TransactionService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AdIns.Template.API.Controllers.Collection
{
    [ApiVersion("1")]
    [Route("v{X-Version:apiVersion}/[controller]")]
    [ApiController]
    [AllowAnonymous]
    [ValidateDTO]
    public class CollectionController : ControllerBase
    {
        #region CONSTRUCTOR
        private readonly ICollectionTrService iCollectionTrService;
        private readonly ICollectionTrObService iCollectionTrObService;

        public CollectionController(
            ICollectionTrService iCollectionTrService,
            ICollectionTrObService iCollectionTrObService) : base()
        {
            this.iCollectionTrService = iCollectionTrService;
            this.iCollectionTrObService = iCollectionTrObService;
        }
        #endregion

        #region QUERY
        [Route("searchOverdueAgreement")]
        [ProducesResponseType(200, Type = typeof(List<SearchOverdueAgrmntResDto>))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> SearchOverdueAgreement(AgreementPagingReqDto req)
        {
            List<SearchOverdueAgrmntResDto> result = await iCollectionTrObService.SearchOverdueAgreement(req);
            return new JsonResult(result);
        }

        [Route("CekTagihan")]
        [ProducesResponseType(200, Type = typeof(CekTagihanResDto))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> CekTagihan([FromBody] string agrmntNo)
        {
            CekTagihanResDto result = await iCollectionTrObService.CekTagihan(agrmntNo);
            return new JsonResult(result);
        }
        #endregion

        #region TRANSACTION
        [Route("SubmitActivity")]
        [ProducesResponseType(200, Type = typeof(SubmitCollectionActivityResDto))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> SubmitActivity(SubmitCollectionActivityReqDto req)
        {
            SubmitCollectionActivityResDto result = await iCollectionTrService.SubmitActivity(req);
            return new JsonResult(result);
        }
        #endregion
    }
}
