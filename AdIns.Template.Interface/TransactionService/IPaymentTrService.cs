using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using System.Threading.Tasks;

namespace AdIns.Template.Interface.TransactionService
{
    public interface IPaymentTrService
    {
        Task<InputPaymentResDto> InputPayment(InputPaymentReqDto req);
    }
}
