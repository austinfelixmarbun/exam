using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Response
{
    public class AgreementPagingResDto
    {
        public long AgrmntId { get; set; }
        public string AgrmntNo { get; set; } = string.Empty;
        public string DebtorName { get; set; } = "-";
        public decimal NtfAmt { get; set; }
        public int? Tenor { get; set; }
        public string ContractStat { get; set; } = string.Empty;
    }
}
