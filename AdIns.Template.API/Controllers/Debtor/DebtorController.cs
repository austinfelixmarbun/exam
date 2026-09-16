using AdIns.Core.Filter;
using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using AdIns.Template.Interface.TrObService;
using AdIns.Template.Interface.TransactionService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AdIns.Template.API.Controllers.Debtor
{
    [ApiVersion("1")]
    [Route("v{X-Version:apiVersion}/[controller]")]
    [ApiController]
    [AllowAnonymous]
    [ValidateDTO]
    public class DebtorController : ControllerBase
    {
        #region CONSTRUCTOR
        private readonly IDebtorTrService iDebtorTrService;
        private readonly IDebtorTrObService iDebtorTrObService;

        public DebtorController(
            IDebtorTrService iDebtorTrService,
            IDebtorTrObService iDebtorTrObService) : base()
        {
            this.iDebtorTrService = iDebtorTrService;
            this.iDebtorTrObService = iDebtorTrObService;
        }
        #endregion

        #region TRANSACTION
        [Route("AddDebtorToAgrmnt")]
        [ProducesResponseType(200, Type = typeof(AddDebtorToAgrmntResDto))]
        [ProducesResponseType(500)]
        [HttpPost]
        [MapToApiVersion("1")]
        public async Task<JsonResult> AddDebtorToAgrmnt(AddDebtorToAgrmntReqDto req)
        {
            AddDebtorToAgrmntResDto result = await iDebtorTrService.AddDebtorToAgrmnt(req);
            return new JsonResult(result);
        }
        #endregion
    }
}
