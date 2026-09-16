using AdIns.DataModel.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.GenericObj
{
    public class ResListKeyValueTrxObj: BaseResponseObj
    {
        public List<KeyValueTrxObj> ListKvp { get; set; }
        public string IntegrationMapCode { get; set; }
        public string TrxNo { get; set; }
    }
}
