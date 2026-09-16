using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreSystemMini.Domain.Entities
{
    [Table("INST_SCHDL")]
    public class InstSchdl
    {
        [Key]
        [Column("INST_SCHDL_ID")]
        public long InstSchdlId { get; set; }

        [Column("AGRMNT_ID")]
        public long AgrmntId { get; set; }

        [Column("INST_SEQ_NO")]
        public int InstSeqNo { get; set; }

        [Column("PRINCIPAL_AMT", TypeName = "decimal(18,2)")]
        public decimal PrincipalAmt { get; set; }

        [Column("INTEREST_AMT", TypeName = "decimal(18,2)")]
        public decimal InterestAmt { get; set; }

        [Column("INST_AMT", TypeName = "decimal(18,2)")]
        public decimal InstAmt { get; set; }

        [Column("INST_PAID_AMT", TypeName = "decimal(18,2)")]
        public decimal InstPaidAmt { get; set; } = 0;

        [Column("LC_AMT", TypeName = "decimal(18,2)")]
        public decimal LcAmt { get; set; } = 0;

        [Column("INST_DUE_DT", TypeName = "date")]
        public DateTime InstDueDt { get; set; }

        [ForeignKey(nameof(AgrmntId))]
        [InverseProperty(nameof(Entities.Agrmnt.InstSchdls))]
        public virtual Agrmnt Agrmnt { get; set; }
    }
}