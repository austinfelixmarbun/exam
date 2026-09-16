using AdIns.DataModel.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.GenericObj
{
    public class ResGenericParamObj: BaseResponseObj
    {
        public ResGenericParamObj(string dataType, bool isNullable, bool isKey, bool isUniqueNo)
        {
            this.DataType = dataType;
            this.IsNullable = isNullable;
            this.IsKey = isKey;
            this.IsUniqueNo = isUniqueNo;
        }

        public string DataType { get; set; }
        public bool IsNullable { get; set; }
        public bool IsKey { get; set; }
        public bool IsUniqueNo { get; set; }
    }
}
