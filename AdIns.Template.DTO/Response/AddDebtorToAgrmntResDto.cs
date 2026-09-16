using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Response
{
    public class AddDebtorToAgrmntResDto
    {
        public long DebtorId { get; set; }
        public string DebtorNo { get; set; } = string.Empty;
        public long AgrmntId { get; set; }
    }
}
