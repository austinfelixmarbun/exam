using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using System.Threading.Tasks;

namespace AdIns.Template.Interface.TransactionService
{
    public interface IAgrmntTrService
    {
        Task<AddAgrmntResDto> AddAgrmnt(AddAgrmntReqDto req);
        Task<AddAgrmntAssetResDto> AddAgrmntAsset(AddAgrmntAssetReqDto req);
        Task<SimulasiAngsuranResDto> SimulasiAngsuran(SimulasiAngsuranReqDto req);
        Task<CompleteAgrmntResDto> CompleteAgrmnt(CompleteAgrmntReqDto req);
        Task<CreditApprovalResDto> CreditApproval(CreditApprovalReqDto req);
    }
}
