using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Response
{
    public class CekTagihanResDto
    {
        public string AgrmntNo { get; set; } = string.Empty;
        public string DebtorName { get; set; } = string.Empty;
        public int OverdueDay { get; set; }
        public decimal TotalInstallmentOverdue { get; set; }
        public decimal OutstandingPrinciple { get; set; }
        public decimal TotalLateChargeAmount { get; set; }
    }
}
