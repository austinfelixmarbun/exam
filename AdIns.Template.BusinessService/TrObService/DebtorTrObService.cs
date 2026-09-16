using AdIns.Core.Service;
using AdIns.Template.DataAccess.Context;
using CoreSystemMini.Domain.Entities;
using AdIns.Template.Interface.TrObService;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace AdIns.Template.BusinessService.TrObService
{
    public class DebtorTrObService : BaseService, IDebtorTrObService
    {
        private readonly TemplateContext context;

        public DebtorTrObService(
            TemplateContext context,
            IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
            this.context = context;
        }

        public virtual async Task<Debtor> GetDebtorForUpdate(long debtorId)
        {
            return await context.Debtor.FirstOrDefaultAsync(d => d.DebtorId == debtorId);
        }
    }
}
