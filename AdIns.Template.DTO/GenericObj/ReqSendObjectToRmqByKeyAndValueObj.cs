using AdIns.DataModel.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.GenericObj
{
    public class ReqSendObjectToRmqByKeyAndValueObj : BaseRequestObj
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public string ExchangeName { get; set; }
        public string MappingCode { get; set; }
        public List<string> IncludeProperties { get; set; }
    }
}
