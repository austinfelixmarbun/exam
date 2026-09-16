using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AdIns.Template.Interface.TrObService
{
    public interface IPaymentTrObService
    {
        Task<List<SearchActiveAgrmntResDto>> SearchActiveAgreement(AgreementPagingReqDto req);
        Task<PaymentViewAgreementResDto> ViewAgreement(string agrmntNo);
    }
}
