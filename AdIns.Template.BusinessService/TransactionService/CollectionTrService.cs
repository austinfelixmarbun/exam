using AdIns.Core.Service;
using AdIns.Core.Transaction;
using AdIns.DataAccess;
using AdIns.Exp.ExceptionCustomType;
using AdIns.Template.Common;
using AdIns.Template.DataAccess.Context;
using CoreSystemMini.Domain.Entities;
using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using AdIns.Template.Interface.TrObService;
using AdIns.Template.Interface.TransactionService;
using Decor;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdIns.Template.BusinessService.TransactionService
{
    public class CollectionTrService : BaseService, ICollectionTrService
    {
        private readonly IRepository repository;
        private readonly IAgrmntTrObService iAgrmntTrObService;
        private const decimal DAILY_LC_RATE = 0.005m;

        public CollectionTrService(
            TemplateContext context,
            IHttpContextAccessor httpContextAccessor,
            Func<BaseDbContext, IRepository> repository,
            IAgrmntTrObService iAgrmntTrObService) : base(httpContextAccessor)
        {
            this.repository = repository(context);
            this.iAgrmntTrObService = iAgrmntTrObService;
        }

        [Decorate(typeof(TransactionHandler))]
        public virtual async Task<SubmitCollectionActivityResDto> SubmitActivity(SubmitCollectionActivityReqDto req)
        {
            Agrmnt agrmnt = await iAgrmntTrObService.GetAgrmntByNoForUpdate(req.AgrmntNo);
            if (agrmnt == null)
            {
                string[] arr = { "Agreement" };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            DateTime businessDt = await iAgrmntTrObService.GetCurrentBusinessDt();

            if (req.ActivityResult == "Failed")
            {
                ColActivity failAct = new ColActivity
                {
                    AgrmntId = agrmnt.AgrmntId,
                    ActivityDt = req.ActivityDate,
                    ActivityResult = "Failed",
                    Notes = req.Notes,
                    LcAmt = 0,
                    TotalPaidAmt = 0,
                    InstPaidAmt = 0
                };

                repository.Add(failAct);
                await repository.SaveChangesAsync();

                return new SubmitCollectionActivityResDto
                {
                    ActivityId = failAct.ActivityId,
                    AgrmntNo = agrmnt.AgrmntNo,
                    ActivityResult = "Failed",
                    ContractStat = agrmnt.ContractStat
                };
            }

            List<InstSchdl> overdueSchedules = agrmnt.InstSchdls
                .Where(s => s.InstPaidAmt < s.InstAmt && s.InstDueDt < businessDt)
                .OrderBy(s => s.InstDueDt)
                .ToList();

            int n = overdueSchedules.Count;
            decimal totalLc = 0;
            List<decimal> lcAmtList = new List<decimal>();

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
                lcAmtList.Add(lcAmt);
                totalLc += lcAmt;
            }

            decimal totalInstOverdue = overdueSchedules.Sum(s => s.InstAmt - s.InstPaidAmt);
            decimal totalExpected = totalInstOverdue + totalLc;

            if (req.PaidAmount == null || req.PaidAmount.Value != totalExpected)
            {
                string[] arr = { "Paid amount must match Total Installment Overdue + Total Late Charge Amount (" + totalExpected.ToString("N2") + ")." };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            ColActivity succAct = new ColActivity
            {
                AgrmntId = agrmnt.AgrmntId,
                ActivityDt = req.ActivityDate,
                ActivityResult = "Success",
                Notes = req.Notes,
                LcAmt = totalLc,
                TotalPaidAmt = req.PaidAmount.Value,
                InstPaidAmt = totalInstOverdue
            };

            repository.Add(succAct);
            await repository.SaveChangesAsync();

            PayHistH payH = new PayHistH
            {
                AgrmntId = agrmnt.AgrmntId,
                PostDt = businessDt,
                ValueDt = req.ActivityDate,
                TotalPaidAmt = req.PaidAmount.Value
            };

            repository.Add(payH);
            await repository.SaveChangesAsync();

            decimal principalPortionPerMonth = Math.Round(agrmnt.NtfAmt / agrmnt.Tenor, 2);
            decimal interestPortionPerMonth = Math.Round(agrmnt.OsInterestAmt / agrmnt.Tenor, 2);

            for (int i = 0; i < n; i++)
            {
                InstSchdl schdl = overdueSchedules[i];

                PayHistD payDInst = new PayHistD
                {
                    PayHistHId = payH.PayHistHId,
                    InstSeqNo = schdl.InstSeqNo,
                    PaymentAllocation = "INST_AMT",
                    Amt = schdl.InstAmt
                };
                repository.Add(payDInst);

                if (lcAmtList[i] > 0)
                {
                    PayHistD payDLc = new PayHistD
                    {
                        PayHistHId = payH.PayHistHId,
                        InstSeqNo = schdl.InstSeqNo,
                        PaymentAllocation = "LC",
                        Amt = lcAmtList[i]
                    };
                    repository.Add(payDLc);
                }

                schdl.InstPaidAmt = schdl.InstAmt;
                schdl.LcAmt = lcAmtList[i];

                agrmnt.OsPrincipalAmt = Math.Max(0, agrmnt.OsPrincipalAmt - principalPortionPerMonth);
                agrmnt.OsInterestAmt = Math.Max(0, agrmnt.OsInterestAmt - interestPortionPerMonth);
            }

            bool hasUnpaid = agrmnt.InstSchdls.Any(s => s.InstPaidAmt < s.InstAmt);
            if (!hasUnpaid)
            {
                agrmnt.ContractStat = "RRD";
            }

            await repository.SaveChangesAsync();

            return new SubmitCollectionActivityResDto
            {
                ActivityId = succAct.ActivityId,
                AgrmntNo = agrmnt.AgrmntNo,
                ActivityResult = "Success",
                ContractStat = agrmnt.ContractStat
            };
        }
    }
}
