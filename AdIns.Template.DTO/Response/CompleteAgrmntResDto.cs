using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Response
{
    public class CompleteAgrmntResDto
    {
        public long AgrmntId { get; set; }
        public string ContractStat { get; set; } = "PAP";
    }
}
