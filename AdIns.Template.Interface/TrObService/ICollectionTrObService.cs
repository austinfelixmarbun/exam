using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AdIns.Template.Interface.TrObService
{
    public interface ICollectionTrObService
    {
        Task<List<SearchOverdueAgrmntResDto>> SearchOverdueAgreement(AgreementPagingReqDto req);
        Task<CekTagihanResDto> CekTagihan(string agrmntNo);
    }
}
