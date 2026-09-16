using CoreSystemMini.Domain.Entities;
using System.Threading.Tasks;

namespace AdIns.Template.Interface.TrObService
{
    public interface IDebtorTrObService
    {
        Task<Debtor> GetDebtorForUpdate(long debtorId);
    }
}
