using CoreSystemMini.Domain.Entities;
using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AdIns.Template.Interface.TrObService
{
    public interface IAgrmntTrObService
    {
        Task<List<AgreementPagingResDto>> SearchAgreement(AgreementPagingReqDto req);
        Task<List<AgreementPagingResDto>> SearchPendingAgreement(AgreementPagingReqDto req);
        Task<AgrmntDetailResDto> GetAgrmntDetail(long agrmntId);
        Task<Agrmnt> GetAgrmntForUpdate(long agrmntId);
        Task<Agrmnt> GetAgrmntByNoForUpdate(string agrmntNo);
        Task<string> GenerateAgrmntNo(DateTime agreementDt);
        Task<string> GenerateDebtorNo();
        Task<DateTime> GetCurrentBusinessDt();
    }
}
