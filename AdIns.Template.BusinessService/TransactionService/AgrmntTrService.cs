using AdIns.Core.Service;
using AdIns.Core.Transaction;
using AdIns.DataAccess;
using AdIns.Exp.ExceptionCustomType;
using AdIns.Template.Common;
using AdIns.Template.DataAccess.Context;
using CoreSystemMini.Domain.Entities;
using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using AdIns.Template.Interface;
using AdIns.Template.Interface.TrObService;
using AdIns.Template.Interface.TransactionService;
using Decor;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdIns.Template.BusinessService.TransactionService
{
    public class AgrmntTrService : BaseService, IAgrmntTrService
    {
        private readonly TemplateContext context;
        private readonly IRepository repository;
        private readonly IAgrmntTrObService iAgrmntTrObService;
        private readonly IIntegrationService iIntegrationService;

        public AgrmntTrService(
            TemplateContext context,
            IHttpContextAccessor httpContextAccessor,
            Func<BaseDbContext, IRepository> repository,
            IAgrmntTrObService iAgrmntTrObService,
            IIntegrationService iIntegrationService) : base(httpContextAccessor)
        {
            this.context = context;
            this.repository = repository(context);
            this.iAgrmntTrObService = iAgrmntTrObService;
            this.iIntegrationService = iIntegrationService;
        }

        [Decorate(typeof(TransactionHandler))]
        public virtual async Task<AddAgrmntResDto> AddAgrmnt(AddAgrmntReqDto req)
        {
            bool salesPersonExists = await context.SalesPerson.AnyAsync(s => s.SalesPersonId == req.SalesPersonId);
            if (!salesPersonExists)
            {
                string[] arr = { "Sales Person" };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            string agrmntNo = await iAgrmntTrObService.GenerateAgrmntNo(req.AgreementDate);

            Agrmnt agrmnt = new Agrmnt
            {
                AgrmntNo = agrmntNo,
                AgrmntDt = req.AgreementDate,
                GracePeriod = req.GracePeriod,
                SalesPersonId = req.SalesPersonId,
                ContractStat = "NEW",
                OsPrincipalAmt = 0,
                OsInterestAmt = 0,
                OtrAmt = 0,
                DownpaymentAmt = 0,
                NtfAmt = 0,
                Tenor = 0,
                InterestRate = 0,
                InstAmt = 0
            };

            repository.Add(agrmnt);
            await repository.SaveChangesAsync();

            return new AddAgrmntResDto
            {
                AgrmntId = agrmnt.AgrmntId,
                AgrmntNo = agrmnt.AgrmntNo,
                ContractStat = agrmnt.ContractStat
            };
        }

        [Decorate(typeof(TransactionHandler))]
        public virtual async Task<AddAgrmntAssetResDto> AddAgrmntAsset(AddAgrmntAssetReqDto req)
        {
            Agrmnt agrmnt = await iAgrmntTrObService.GetAgrmntForUpdate(req.AgrmntId);
            if (agrmnt == null)
            {
                string[] arr = { "Agreement" };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            decimal totalOtr = 0;
            foreach (AssetRowDto assetRow in req.Assets)
            {
                RefAssetMaster refAsset = await context.RefAssetMaster
                    .FirstOrDefaultAsync(r => r.RefAssetMasterId == assetRow.RefAssetMasterId && r.IsActive);

                if (refAsset == null)
                {
                    string[] arr = { "Asset Master" };
                    throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
                }

                AgrmntAsset agrmntAsset = new AgrmntAsset
                {
                    AgrmntId = req.AgrmntId,
                    RefAssetMasterId = assetRow.RefAssetMasterId,
                    AssetDetailInfo = assetRow.AssetDetailInfo
                };

                repository.Add(agrmntAsset);
                totalOtr += refAsset.AssetPrice;
            }

            agrmnt.OtrAmt = totalOtr;
            await repository.SaveChangesAsync();

            return new AddAgrmntAssetResDto
            {
                AgrmntId = agrmnt.AgrmntId,
                TotalOtrAmt = agrmnt.OtrAmt
            };
        }

        public virtual async Task<SimulasiAngsuranResDto> SimulasiAngsuran(SimulasiAngsuranReqDto req)
        {
            Agrmnt agrmnt = await iAgrmntTrObService.GetAgrmntForUpdate(req.AgrmntId);
            if (agrmnt == null)
            {
                string[] arr = { "Agreement" };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            if (req.DownpaymentAmt >= agrmnt.OtrAmt)
            {
                string[] arr = { "Downpayment must be less than OTR Amount." };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            decimal ntfAmt = agrmnt.OtrAmt - req.DownpaymentAmt;
            decimal osPrincipalAmt = ntfAmt;
            decimal osInterestAmt = osPrincipalAmt * req.InterestRate;
            decimal instAmt = Math.Round((ntfAmt + osInterestAmt) / req.Tenor, 2);

            SimulasiAngsuranResDto res = new SimulasiAngsuranResDto
            {
                OtrAmt = agrmnt.OtrAmt,
                DownpaymentAmt = req.DownpaymentAmt,
                NtfAmt = ntfAmt,
                OsPrincipalAmt = osPrincipalAmt,
                OsInterestAmt = osInterestAmt,
                InstAmt = instAmt
            };

            decimal principalPerMonth = Math.Round(ntfAmt / req.Tenor, 2);
            decimal interestPerMonth = Math.Round(osInterestAmt / req.Tenor, 2);

            for (int i = 1; i <= req.Tenor; i++)
            {
                decimal osPrincipal = Math.Max(0, ntfAmt - (i * principalPerMonth));
                decimal osInterest = Math.Max(0, osInterestAmt - (i * interestPerMonth));
                if (i == req.Tenor)
                {
                    osPrincipal = 0;
                    osInterest = 0;
                }

                res.ScheduleRows.Add(new SimulasiInstallmentScheduleRowDto
                {
                    InstSeqNo = i,
                    InstallmentAmount = instAmt,
                    PrincipalAmount = principalPerMonth,
                    InterestAmount = interestPerMonth,
                    OSPrincipalAmount = osPrincipal,
                    OSInterestAmount = osInterest
                });
            }

            return res;
        }

        [Decorate(typeof(TransactionHandler))]
        public virtual async Task<CompleteAgrmntResDto> CompleteAgrmnt(CompleteAgrmntReqDto req)
        {
            Agrmnt agrmnt = await iAgrmntTrObService.GetAgrmntForUpdate(req.AgrmntId);
            if (agrmnt == null)
            {
                string[] arr = { "Agreement" };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            agrmnt.DownpaymentAmt = req.DownpaymentAmt;
            agrmnt.NtfAmt = agrmnt.OtrAmt - req.DownpaymentAmt;
            agrmnt.Tenor = req.Tenor;
            agrmnt.InterestRate = req.InterestRate;
            agrmnt.InstAmt = req.InstAmt;
            agrmnt.OsPrincipalAmt = agrmnt.NtfAmt;
            agrmnt.OsInterestAmt = agrmnt.NtfAmt * req.InterestRate;
            agrmnt.ContractStat = "PAP";

            await repository.SaveChangesAsync();

            return new CompleteAgrmntResDto
            {
                AgrmntId = agrmnt.AgrmntId,
                ContractStat = agrmnt.ContractStat
            };
        }

        [Decorate(typeof(TransactionHandler))]
        public virtual async Task<CreditApprovalResDto> CreditApproval(CreditApprovalReqDto req)
        {
            Agrmnt agrmnt = await iAgrmntTrObService.GetAgrmntByNoForUpdate(req.AgreementNo);
            if (agrmnt == null)
            {
                string[] arr = { "Agreement" };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            if (agrmnt.ContractStat != "PAP")
            {
                string[] arr = { "Agreement is not in PAP status" };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            if (req.Status == "Acc")
            {
                agrmnt.ContractStat = "LIVE";

                decimal principalPerMonth = Math.Round(agrmnt.NtfAmt / agrmnt.Tenor, 2);
                decimal interestPerMonth = Math.Round(agrmnt.OsInterestAmt / agrmnt.Tenor, 2);

                for (int n = 1; n <= agrmnt.Tenor; n++)
                {
                    InstSchdl schdl = new InstSchdl
                    {
                        AgrmntId = agrmnt.AgrmntId,
                        InstSeqNo = n,
                        PrincipalAmt = principalPerMonth,
                        InterestAmt = interestPerMonth,
                        InstAmt = agrmnt.InstAmt,
                        InstPaidAmt = 0,
                        LcAmt = 0,
                        InstDueDt = agrmnt.AgrmntDt.AddMonths(n)
                    };
                    repository.Add(schdl);
                }

                try
                {
                    Debtor debtor = agrmnt.Debtor;
                    string assetDetailInfo = agrmnt.AgrmntAssets != null && agrmnt.AgrmntAssets.Count > 0
                        ? agrmnt.AgrmntAssets.First().AssetDetailInfo
                        : "-";

                    SlikOjkSubmissionPayloadDto slikPayload = new SlikOjkSubmissionPayloadDto
                    {
                        agreementNumber = agrmnt.AgrmntNo,
                        debtorNumber = debtor != null ? debtor.DebtorNo : "-",
                        namaDebtor = debtor != null ? debtor.FullName : "-",
                        noKtp = debtor != null ? debtor.IdNo : "-",
                        alamat = debtor != null ? (debtor.City + " - " + debtor.Address) : "-",
                        besarGaji = debtor != null ? Convert.ToInt32(debtor.Income) : 0,
                        nomorTelp = debtor != null ? debtor.PhoneNumber : "-",
                        email = debtor != null ? debtor.Email : "-",
                        assetInfo = assetDetailInfo,
                        agreementDate = agrmnt.AgrmntDt.ToString("yyyy-MM-dd"),
                        tenor = agrmnt.Tenor,
                        interestRate = Convert.ToInt32(agrmnt.InterestRate * 100),
                        ntfAmt = Convert.ToInt32(agrmnt.NtfAmt),
                        instAmt = Convert.ToInt32(agrmnt.InstAmt),
                        osPrincipalAmt = Convert.ToInt32(agrmnt.OsPrincipalAmt),
                        osInterestAmt = Convert.ToInt32(agrmnt.OsInterestAmt),
                        osInstallmentAmt = Convert.ToInt32(agrmnt.OsPrincipalAmt + agrmnt.OsInterestAmt),
                        contractStat = "LIVE"
                    };

                    await iIntegrationService.SendToRabbitMqDirectForTrxLogging("SLIK_OJK", "q.slik-ojk-submission", "slik-ojk", slikPayload);
                }
                catch
                {
                }
            }
            else if (req.Status == "Reject")
            {
                agrmnt.ContractStat = "REJ";
            }

            await repository.SaveChangesAsync();

            return new CreditApprovalResDto
            {
                AgreementNo = agrmnt.AgrmntNo,
                ContractStat = agrmnt.ContractStat,
                Message = "Credit approval processed successfully."
            };
        }
    }
}
