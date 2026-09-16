using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Response
{
    public class AgrmntDetailResDto
    {
        public long AgrmntId { get; set; }
        public string AgrmntNo { get; set; }
        public DateTime AgrmntDt { get; set; }
        public string ContractStat { get; set; }
        public int GracePeriod { get; set; }
        public string SalesPersonName { get; set; }
        public decimal OtrAmt { get; set; }
        public decimal DownpaymentAmt { get; set; }
        public decimal NtfAmt { get; set; }
        public int? Tenor { get; set; }
        public decimal InterestRate { get; set; }
        public decimal InstAmt { get; set; }
        public decimal OsPrincipalAmt { get; set; }
        public decimal OsInterestAmt { get; set; }

        public DebtorDetailDto Debtor { get; set; }
        public List<InstallmentScheduleDto> InstallmentSchedules { get; set; } = new();
    }
}
