using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreSystemMini.Domain.Entities
{
    [Table("COL_ACTIVITY")]
    public class ColActivity
    {
        [Key]
        [Column("ACTIVITY_ID")]
        public long ActivityId { get; set; }

        [Column("AGRMNT_ID")]
        public long AgrmntId { get; set; }

        [Column("ACTIVITY_DT", TypeName = "datetime")]
        public DateTime ActivityDt { get; set; }

        [Required]
        [MaxLength(15)]
        [Column("ACTIVITY_RESULT")]
        public string ActivityResult { get; set; }

        [MaxLength(200)]
        [Column("NOTES")]
        public string Notes { get; set; }

        [Column("LC_AMT", TypeName = "decimal(18,2)")]
        public decimal LcAmt { get; set; }

        [Column("TOTAL_PAID_AMT", TypeName = "decimal(18,2)")]
        public decimal TotalPaidAmt { get; set; }

        [Column("INST_PAID_AMT", TypeName = "decimal(18,2)")]
        public decimal InstPaidAmt { get; set; }

        [ForeignKey(nameof(AgrmntId))]
        [InverseProperty(nameof(Entities.Agrmnt.ColActivities))]
        public virtual Agrmnt Agrmnt { get; set; }
    }
}