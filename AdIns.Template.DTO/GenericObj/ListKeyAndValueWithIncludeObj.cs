using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.GenericObj
{
    public class ListKeyAndValueWithIncludeObj
    {
        public List<AdIns.Core.GenericApi.Dto.KeyAndValueObj> ListKeyValue { get; set; }
        public List<string> IncludeProperties { get; set; }
    }
}
