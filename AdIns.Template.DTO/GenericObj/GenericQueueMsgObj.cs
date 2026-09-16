using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.GenericObj
{
    public class GenericQueueMsgObj
    {
        public string Payload { get; set; }
        public string SystemFrom { get; set; }
        public string IntegrationMapCode { get; set; }
        public string TrxNo { get; set; }
    }
}
