using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Response
{
    public class InputPaymentResDto
    {
        public long PayHistHId { get; set; }
        public string AgrmntNo { get; set; } = string.Empty;
        public decimal TotalPaidAmt { get; set; }
        public string ContractStat { get; set; } = string.Empty;
    }
}
