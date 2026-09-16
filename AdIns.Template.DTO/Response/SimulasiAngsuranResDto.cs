using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Response
{
    public class SimulasiAngsuranResDto
    {
        public decimal OtrAmt { get; set; }
        public decimal DownpaymentAmt { get; set; }
        public decimal NtfAmt { get; set; }
        public decimal OsPrincipalAmt { get; set; }
        public decimal OsInterestAmt { get; set; }
        public decimal InstAmt { get; set; }
        public List<SimulasiInstallmentScheduleRowDto> ScheduleRows { get; set; } = new();
    }
}
