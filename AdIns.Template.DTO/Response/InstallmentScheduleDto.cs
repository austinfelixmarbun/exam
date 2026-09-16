using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Response
{
    public class InstallmentScheduleDto
    {
        public int InstSeqNo { get; set; }
        public DateTime InstDueDt { get; set; }
        public decimal PrincipalAmount { get; set; }
        public decimal InterestAmount { get; set; }
        public decimal InstallmentAmount { get; set; }
    }
}
