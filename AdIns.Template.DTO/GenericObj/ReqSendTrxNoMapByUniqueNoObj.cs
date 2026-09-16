using AdIns.DataModel.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.GenericObj
{
    public class ReqSendTrxNoMapByUniqueNoObj: BaseRequestObj
    {

        [DataType(DataType.Text)]
        [StringLength(50)]
        //[Required(AllowEmptyStrings = false)]
        public string Key { get; set; }
        [DataType(DataType.Text)]
        [StringLength(50)]
        public string Operator { get; set; } = "EQ";

        [DataType(DataType.Text)]
        [StringLength(50)]
        //[Required(AllowEmptyStrings = false)]
        public string Value { get; set; }

        [DataType(DataType.Text)]
        [StringLength(50)]
        [Required(AllowEmptyStrings = false)]
        public string ExchangeName { get; set; }

        [DataType(DataType.Text)]
        [StringLength(50)]
        [Required(AllowEmptyStrings = false)]
        public string IntMapCode { get; set; }
        public List<string> IncludeProperties { get; set; }
    }
}
