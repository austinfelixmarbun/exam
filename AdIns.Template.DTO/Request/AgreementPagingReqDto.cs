using System;
using System.ComponentModel.DataAnnotations;

namespace AdIns.Template.DTO.Request
{
    public class AgreementPagingReqDto
    {
        public string? AgrmntNo { get; set; }
        public string? DebtorName { get; set; }
        public string? ContractStat { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
