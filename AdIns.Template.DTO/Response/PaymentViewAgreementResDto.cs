using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Response
{
    public class PaymentViewAgreementResDto
    {
        public string AgrmntNo { get; set; } = string.Empty;
        public string DebtorName { get; set; } = string.Empty;
        public decimal MonthlyInstallment { get; set; }
        public int NextInstallmentSequence { get; set; }
    }
}
