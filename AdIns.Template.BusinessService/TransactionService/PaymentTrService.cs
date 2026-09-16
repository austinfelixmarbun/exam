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
    public class PaymentTrService : BaseService, IPaymentTrService
    {
        private readonly IRepository repository;
        private readonly IAgrmntTrObService iAgrmntTrObService;

        public PaymentTrService(
            TemplateContext context,
            IHttpContextAccessor httpContextAccessor,
            Func<BaseDbContext, IRepository> repository,
            IAgrmntTrObService iAgrmntTrObService) : base(httpContextAccessor)
        {
            this.repository = repository(context);
            this.iAgrmntTrObService = iAgrmntTrObService;
        }

        [Decorate(typeof(TransactionHandler))]
        public virtual async Task<InputPaymentResDto> InputPayment(InputPaymentReqDto req)
        {
            Agrmnt agrmnt = await iAgrmntTrObService.GetAgrmntByNoForUpdate(req.AgrmntNo);
            if (agrmnt == null)
            {
                string[] arr = { "Agreement" };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            if (agrmnt.ContractStat != "LIVE")
            {
                string[] arr = { "Agreement is not LIVE" };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            InstSchdl nextSchdl = agrmnt.InstSchdls
                .Where(s => s.InstPaidAmt < s.InstAmt)
                .OrderBy(s => s.InstSeqNo)
                .FirstOrDefault();

            if (nextSchdl == null)
            {
                string[] arr = { "No pending installments" };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            if (req.PaymentAmount != nextSchdl.InstAmt)
            {
                string[] arr = { "Payment amount must match the monthly installment amount exactly." };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            DateTime businessDt = await iAgrmntTrObService.GetCurrentBusinessDt();

            PayHistH payH = new PayHistH
            {
                AgrmntId = agrmnt.AgrmntId,
                PostDt = businessDt,
                ValueDt = req.ValueDate,
                TotalPaidAmt = req.PaymentAmount
            };

            repository.Add(payH);
            await repository.SaveChangesAsync();

            PayHistD payD = new PayHistD
            {
                PayHistHId = payH.PayHistHId,
                InstSeqNo = nextSchdl.InstSeqNo,
                PaymentAllocation = "INST_AMT",
                Amt = req.PaymentAmount
            };

            repository.Add(payD);

            nextSchdl.InstPaidAmt = nextSchdl.InstAmt;

            decimal principalPortion = Math.Round(agrmnt.NtfAmt / agrmnt.Tenor, 2);
            decimal interestPortion = Math.Round(agrmnt.OsInterestAmt / agrmnt.Tenor, 2);

            agrmnt.OsPrincipalAmt = Math.Max(0, agrmnt.OsPrincipalAmt - principalPortion);
            agrmnt.OsInterestAmt = Math.Max(0, agrmnt.OsInterestAmt - interestPortion);

            bool hasUnpaid = agrmnt.InstSchdls.Any(s => s.InstPaidAmt < s.InstAmt);
            if (!hasUnpaid)
            {
                agrmnt.ContractStat = "RRD";
            }

            await repository.SaveChangesAsync();

            return new InputPaymentResDto
            {
                PayHistHId = payH.PayHistHId,
                AgrmntNo = agrmnt.AgrmntNo,
                TotalPaidAmt = req.PaymentAmount,
                ContractStat = agrmnt.ContractStat
            };
        }
    }
}
