using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using System.Threading.Tasks;

namespace AdIns.Template.Interface.TransactionService
{
    public interface ICollectionTrService
    {
        Task<SubmitCollectionActivityResDto> SubmitActivity(SubmitCollectionActivityReqDto req);
    }
}
