using AdIns.Core.Service;
using AdIns.Exp.ExceptionCustomType;
using AdIns.Template.Common;
using AdIns.Template.DataAccess.Context;
using CoreSystemMini.Domain.Entities;
using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using AdIns.Template.Interface.TrObService;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdIns.Template.BusinessService.TrObService
{
    public class PaymentTrObService : BaseService, IPaymentTrObService
    {
        private readonly TemplateContext context;
        private readonly IAgrmntTrObService iAgrmntTrObService;

        public PaymentTrObService(
            TemplateContext context,
            IHttpContextAccessor httpContextAccessor,
            IAgrmntTrObService iAgrmntTrObService) : base(httpContextAccessor)
        {
            this.context = context;
            this.iAgrmntTrObService = iAgrmntTrObService;
        }

        public virtual async Task<List<SearchActiveAgrmntResDto>> SearchActiveAgreement(AgreementPagingReqDto req)
        {
            DateTime businessDt = await iAgrmntTrObService.GetCurrentBusinessDt();

            IQueryable<Agrmnt> query = context.Agrmnt
                .Include(a => a.Debtor)
                .Include(a => a.InstSchdls)
                .AsNoTracking()
                .Where(a => a.ContractStat == "LIVE");

            if (!string.IsNullOrWhiteSpace(req.AgrmntNo))
            {
                query = query.Where(a => a.AgrmntNo.Contains(req.AgrmntNo));
            }

            if (!string.IsNullOrWhiteSpace(req.DebtorName))
            {
                query = query.Where(a => a.Debtor != null && a.Debtor.FullName.Contains(req.DebtorName));
            }

            List<Agrmnt> allLiveAgrmnts = await query.ToListAsync();
            List<SearchActiveAgrmntResDto> result = new List<SearchActiveAgrmntResDto>();

            foreach (Agrmnt a in allLiveAgrmnts)
            {
                List<InstSchdl> unpaid = a.InstSchdls
                    .Where(s => s.InstPaidAmt < s.InstAmt)
                    .OrderBy(s => s.InstDueDt)
                    .ToList();

                if (unpaid.Count == 0) continue;

                DateTime nextDueDt = unpaid.First().InstDueDt;
                DateTime maxAllowedDate = nextDueDt.AddDays(a.GracePeriod);

                if (businessDt <= maxAllowedDate)
                {
                    result.Add(new SearchActiveAgrmntResDto
                    {
                        AgrmntId = a.AgrmntId,
                        AgrmntNo = a.AgrmntNo,
                        DebtorName = a.Debtor != null ? a.Debtor.FullName : "-",
                        AgreementDate = a.AgrmntDt,
                        InstallmentAmount = a.InstAmt
                    });
                }
            }

            return result
                .Skip((req.PageNumber - 1) * req.PageSize)
                .Take(req.PageSize)
                .ToList();
        }

        public virtual async Task<PaymentViewAgreementResDto> ViewAgreement(string agrmntNo)
        {
            Agrmnt agrmnt = await context.Agrmnt
                .Include(a => a.Debtor)
                .Include(a => a.InstSchdls)
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.AgrmntNo == agrmntNo);

            if (agrmnt == null)
            {
                string[] arr = { "Agreement" };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            InstSchdl nextSchdl = agrmnt.InstSchdls
                .Where(s => s.InstPaidAmt < s.InstAmt)
                .OrderBy(s => s.InstSeqNo)
                .FirstOrDefault();

            return new PaymentViewAgreementResDto
            {
                AgrmntNo = agrmnt.AgrmntNo,
                DebtorName = agrmnt.Debtor != null ? agrmnt.Debtor.FullName : "-",
                MonthlyInstallment = agrmnt.InstAmt,
                NextInstallmentSequence = nextSchdl != null ? nextSchdl.InstSeqNo : 0
            };
        }
    }
}
