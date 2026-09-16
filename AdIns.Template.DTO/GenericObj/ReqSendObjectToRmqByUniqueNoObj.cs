using AdIns.DataModel.Base;
using System.Collections.Generic;

namespace AdIns.Template.DTO.GenericObj
{
    public class ReqSendObjectToRmqByUniqueNoObj: BaseRequestObj
    {
        public string TrxNo { get; set; }
        public string ExchangeName { get; set; }
        public string MappingCode { get; set; }
        public List<string> IncludeProperties { get; set; }
    }
}
