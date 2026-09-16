using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Response
{
    public class AddAgrmntResDto
    {
        public long AgrmntId { get; set; }
        public string AgrmntNo { get; set; } = string.Empty;
        public string ContractStat { get; set; } = "NEW";
    }
}
