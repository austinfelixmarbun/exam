using AdIns.DataModel.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.GenericObj
{
    public class ReqByIdWithIncludeObj: BaseRequestObj
    {
        public long Id { get; set; }
        public List<string> IncludeProperties { get; set; }
    }
}
