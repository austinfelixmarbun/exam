using AdIns.Core.Service;
using AdIns.DataAccess;
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
    public class AgrmntTrObService : BaseService, IAgrmntTrObService
    {
        private readonly TemplateContext context;

        public AgrmntTrObService(
            TemplateContext context,
            IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
            this.context = context;
        }

        public virtual async Task<DateTime> GetCurrentBusinessDt()
        {
            BusinessDt bdt = await context.BusinessDt.AsNoTracking().FirstOrDefaultAsync();
            return bdt != null ? bdt.BusinessDate : DateTime.Today;
        }

        public virtual async Task<List<AgreementPagingResDto>> SearchAgreement(AgreementPagingReqDto req)
        {
            IQueryable<Agrmnt> query = context.Agrmnt
                .Include(a => a.Debtor)
                .AsNoTracking();

            if (!string.IsNullOrWhiteSpace(req.AgrmntNo))
            {
                query = query.Where(a => a.AgrmntNo.Contains(req.AgrmntNo));
            }

            if (!string.IsNullOrWhiteSpace(req.DebtorName))
            {
                query = query.Where(a => a.Debtor != null && a.Debtor.FullName.Contains(req.DebtorName));
            }

            if (!string.IsNullOrWhiteSpace(req.ContractStat))
            {
                query = query.Where(a => a.ContractStat == req.ContractStat);
            }

            List<Agrmnt> list = await query
                .OrderByDescending(a => a.AgrmntId)
                .Skip((req.PageNumber - 1) * req.PageSize)
                .Take(req.PageSize)
                .ToListAsync();

            List<AgreementPagingResDto> result = new List<AgreementPagingResDto>();
            foreach (Agrmnt a in list)
            {
                result.Add(new AgreementPagingResDto
                {
                    AgrmntId = a.AgrmntId,
                    AgrmntNo = a.AgrmntNo,
                    DebtorName = a.Debtor != null ? a.Debtor.FullName : "-",
                    NtfAmt = a.NtfAmt,
                    Tenor = a.Tenor > 0 ? a.Tenor : null,
                    ContractStat = a.ContractStat
                });
            }

            return result;
        }

        public virtual async Task<List<AgreementPagingResDto>> SearchPendingAgreement(AgreementPagingReqDto req)
        {
            IQueryable<Agrmnt> query = context.Agrmnt
                .Include(a => a.Debtor)
                .AsNoTracking()
                .Where(a => a.ContractStat == "PAP");

            if (!string.IsNullOrWhiteSpace(req.AgrmntNo))
            {
                query = query.Where(a => a.AgrmntNo.Contains(req.AgrmntNo));
            }

            if (!string.IsNullOrWhiteSpace(req.DebtorName))
            {
                query = query.Where(a => a.Debtor != null && a.Debtor.FullName.Contains(req.DebtorName));
            }

            List<Agrmnt> list = await query
                .OrderByDescending(a => a.AgrmntId)
                .Skip((req.PageNumber - 1) * req.PageSize)
                .Take(req.PageSize)
                .ToListAsync();

            List<AgreementPagingResDto> result = new List<AgreementPagingResDto>();
            foreach (Agrmnt a in list)
            {
                result.Add(new AgreementPagingResDto
                {
                    AgrmntId = a.AgrmntId,
                    AgrmntNo = a.AgrmntNo,
                    DebtorName = a.Debtor != null ? a.Debtor.FullName : "-",
                    NtfAmt = a.NtfAmt,
                    Tenor = a.Tenor > 0 ? a.Tenor : null,
                    ContractStat = a.ContractStat
                });
            }

            return result;
        }

        public virtual async Task<AgrmntDetailResDto> GetAgrmntDetail(long agrmntId)
        {
            Agrmnt agrmnt = await context.Agrmnt
                .Include(a => a.Debtor)
                .Include(a => a.SalesPerson)
                .Include(a => a.InstSchdls)
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.AgrmntId == agrmntId);

            if (agrmnt == null)
            {
                string[] arr = { "Agreement" };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            AgrmntDetailResDto dto = new AgrmntDetailResDto
            {
                AgrmntId = agrmnt.AgrmntId,
                AgrmntNo = agrmnt.AgrmntNo,
                AgrmntDt = agrmnt.AgrmntDt,
                ContractStat = agrmnt.ContractStat,
                GracePeriod = agrmnt.GracePeriod,
                SalesPersonName = agrmnt.SalesPerson != null ? agrmnt.SalesPerson.SalesPersonName : "-",
                OtrAmt = agrmnt.OtrAmt,
                DownpaymentAmt = agrmnt.DownpaymentAmt,
                NtfAmt = agrmnt.NtfAmt,
                Tenor = agrmnt.Tenor > 0 ? agrmnt.Tenor : null,
                InterestRate = agrmnt.InterestRate,
                InstAmt = agrmnt.InstAmt,
                OsPrincipalAmt = agrmnt.OsPrincipalAmt,
                OsInterestAmt = agrmnt.OsInterestAmt
            };

            if (agrmnt.Debtor != null)
            {
                dto.Debtor = new DebtorDetailDto
                {
                    DebtorNo = agrmnt.Debtor.DebtorNo,
                    FullName = agrmnt.Debtor.FullName,
                    IdNo = agrmnt.Debtor.IdNo,
                    Email = agrmnt.Debtor.Email,
                    PhoneNumber = agrmnt.Debtor.PhoneNumber,
                    Occupation = agrmnt.Debtor.Occupation,
                    Address = agrmnt.Debtor.Address
                };
            }

            if (agrmnt.InstSchdls != null && agrmnt.InstSchdls.Count > 0)
            {
                foreach (InstSchdl s in agrmnt.InstSchdls.OrderBy(x => x.InstSeqNo))
                {
                    dto.InstallmentSchedules.Add(new InstallmentScheduleDto
                    {
                        InstSeqNo = s.InstSeqNo,
                        InstDueDt = s.InstDueDt,
                        PrincipalAmount = s.PrincipalAmt,
                        InterestAmount = s.InterestAmt,
                        InstallmentAmount = s.InstAmt
                    });
                }
            }

            return dto;
        }

        public virtual async Task<Agrmnt> GetAgrmntForUpdate(long agrmntId)
        {
            Agrmnt agrmnt = await context.Agrmnt
                .Include(a => a.InstSchdls)
                .Include(a => a.AgrmntAssets)
                .FirstOrDefaultAsync(a => a.AgrmntId == agrmntId);
            return agrmnt;
        }

        public virtual async Task<Agrmnt> GetAgrmntByNoForUpdate(string agrmntNo)
        {
            Agrmnt agrmnt = await context.Agrmnt
                .Include(a => a.Debtor)
                .Include(a => a.InstSchdls)
                .Include(a => a.AgrmntAssets)
                .FirstOrDefaultAsync(a => a.AgrmntNo == agrmntNo);
            return agrmnt;
        }

        public virtual async Task<string> GenerateAgrmntNo(DateTime agreementDt)
        {
            MasterSequence seq = await context.MasterSequence.FirstOrDefaultAsync(x => x.MasterSeqCode == "AGRMNT_NO");
            int nextVal = 1;
            if (seq == null)
            {
                seq = new MasterSequence
                {
                    MasterSeqCode = "AGRMNT_NO",
                    SeqNo = 1
                };
                await context.MasterSequence.AddAsync(seq);
            }
            else
            {
                seq.SeqNo += 1;
                nextVal = seq.SeqNo;
            }
            await context.SaveChangesAsync();

            string dayStr = agreementDt.ToString("dd");
            string seqStr = nextVal.ToString("D3");
            return "AGR" + dayStr + seqStr;
        }

        public virtual async Task<string> GenerateDebtorNo()
        {
            MasterSequence seq = await context.MasterSequence.FirstOrDefaultAsync(x => x.MasterSeqCode == "DEBTOR_NO");
            int nextVal = 1;
            if (seq == null)
            {
                seq = new MasterSequence
                {
                    MasterSeqCode = "DEBTOR_NO",
                    SeqNo = 1
                };
                await context.MasterSequence.AddAsync(seq);
            }
            else
            {
                seq.SeqNo += 1;
                nextVal = seq.SeqNo;
            }
            await context.SaveChangesAsync();

            return "CUST-" + nextVal.ToString("D5");
        }
    }
}
