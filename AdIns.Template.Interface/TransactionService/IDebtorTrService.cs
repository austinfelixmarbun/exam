using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using System.Threading.Tasks;

namespace AdIns.Template.Interface.TransactionService
{
    public interface IDebtorTrService
    {
        Task<AddDebtorToAgrmntResDto> AddDebtorToAgrmnt(AddDebtorToAgrmntReqDto req);
    }
}
