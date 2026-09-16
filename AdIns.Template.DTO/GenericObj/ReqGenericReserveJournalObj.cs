using AdIns.DataModel.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.GenericObj
{
    public class ReqGenericReserveJournalObj: BaseRequestObj
    {
        public string TransactionNo { get; set; }
        public string ColumnName { get; set; }
        public string TrxCodeJournal { get; set; }
    }
}
