using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreSystemMini.Domain.Entities
{
    [Table("BUSINESS_DT")]
    public class BusinessDt
    {
        [Key]
        [Column("BUSINESS_DT_ID")]
        public long BusinessDtId { get; set; }

        [Column("BUSINESS_DT", TypeName = "date")]
        public DateTime BusinessDate { get; set; }
    }
}