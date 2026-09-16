using AdIns.DataModel.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.GenericObj
{
    public class ReqKeyAndValueObj: BaseRequestObj
    {
        public string Key { get; set; }
        public string Operator { get; set; } = "EQ";
        public object Value { get; set; }
        public KeyAndValueObj KeyAndValueObj { get; set; }

        public List<string> IncludeProperties { get; set; }
    }
}
