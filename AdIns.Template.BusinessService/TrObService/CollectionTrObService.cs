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
    public class CollectionTrObService : BaseService, ICollectionTrObService
    {
        private readonly TemplateContext context;
        private readonly IAgrmntTrObService iAgrmntTrObService;
        private const decimal DAILY_LC_RATE = 0.005m;

        public CollectionTrObService(
            TemplateContext context,
            IHttpContextAccessor httpContextAccessor,
            IAgrmntTrObService iAgrmntTrObService) : base(httpContextAccessor)
        {
            this.context = context;
            this.iAgrmntTrObService = iAgrmntTrObService;
        }

        public virtual async Task<List<SearchOverdueAgrmntResDto>> SearchOverdueAgreement(AgreementPagingReqDto req)
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
            List<SearchOverdueAgrmntResDto> result = new List<SearchOverdueAgrmntResDto>();

            foreach (Agrmnt a in allLiveAgrmnts)
            {
                List<InstSchdl> unpaid = a.InstSchdls
                    .Where(s => s.InstPaidAmt < s.InstAmt)
                    .OrderBy(s => s.InstDueDt)
                    .ToList();

                if (unpaid.Count == 0) continue;

                DateTime nextDueDt = unpaid.First().InstDueDt;
                DateTime maxAllowedDate = nextDueDt.AddDays(a.GracePeriod);

                if (businessDt > maxAllowedDate)
                {
                    result.Add(new SearchOverdueAgrmntResDto
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

        public virtual async Task<CekTagihanResDto> CekTagihan(string agrmntNo)
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

            DateTime businessDt = await iAgrmntTrObService.GetCurrentBusinessDt();

            List<InstSchdl> overdueSchedules = agrmnt.InstSchdls
                .Where(s => s.InstPaidAmt < s.InstAmt && s.InstDueDt < businessDt)
                .OrderBy(s => s.InstDueDt)
                .ToList();

            if (overdueSchedules.Count == 0)
            {
                return new CekTagihanResDto
                {
                    AgrmntNo = agrmnt.AgrmntNo,
                    DebtorName = agrmnt.Debtor != null ? agrmnt.Debtor.FullName : "-",
                    OverdueDay = 0,
                    TotalInstallmentOverdue = 0,
                    OutstandingPrinciple = agrmnt.OsPrincipalAmt,
                    TotalLateChargeAmount = 0
                };
            }

            int n = overdueSchedules.Count;
            decimal totalLc = 0;

            for (int i = 0; i < n; i++)
            {
                DateTime dCurrent = overdueSchedules[i].InstDueDt;
                DateTime batasAkhir;
                if (i + 1 < n && overdueSchedules[i + 1].InstDueDt <= businessDt)
                {
                    batasAkhir = overdueSchedules[i + 1].InstDueDt;
                }
                else
                {
                    batasAkhir = businessDt;
                }

                int hariTelat = Math.Max(0, (batasAkhir - dCurrent).Days);
                decimal lcAmt = hariTelat * DAILY_LC_RATE * overdueSchedules[i].InstAmt;
                totalLc += lcAmt;
            }

            int overdueDay = Math.Max(0, (businessDt - overdueSchedules.First().InstDueDt).Days);
            decimal totalInstOverdue = overdueSchedules.Sum(s => s.InstAmt - s.InstPaidAmt);

            return new CekTagihanResDto
            {
                AgrmntNo = agrmnt.AgrmntNo,
                DebtorName = agrmnt.Debtor != null ? agrmnt.Debtor.FullName : "-",
                OverdueDay = overdueDay,
                TotalInstallmentOverdue = totalInstOverdue,
                OutstandingPrinciple = agrmnt.OsPrincipalAmt,
                TotalLateChargeAmount = totalLc
            };
        }
    }
}
