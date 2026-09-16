using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreSystemMini.Domain.Entities
{
    [Table("PAY_HIST_D")]
    public class PayHistD
    {
        [Key]
        [Column("PAY_HIST_D_ID")]
        public long PayHistDId { get; set; }

        [Column("PAY_HIST_H_ID")]
        public long PayHistHId { get; set; }

        [Column("INST_SEQ_NO")]
        public int InstSeqNo { get; set; }

        [Required]
        [MaxLength(20)]
        [Column("PAYMENT_ALLOCATION")]
        public string PaymentAllocation { get; set; }

        [Column("AMT", TypeName = "decimal(18,2)")]
        public decimal Amt { get; set; }

        [ForeignKey(nameof(PayHistHId))]
        [InverseProperty(nameof(Entities.PayHistH.PayHistDs))]
        public virtual PayHistH PayHistH { get; set; }
    }
}