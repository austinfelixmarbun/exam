using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreSystemMini.Domain.Entities
{
    [Table("PAY_HIST_H")]
    public class PayHistH
    {
        public PayHistH()
        {
            PayHistDs = new HashSet<PayHistD>();
        }

        [Key]
        [Column("PAY_HIST_H_ID")]
        public long PayHistHId { get; set; }

        [Column("AGRMNT_ID")]
        public long AgrmntId { get; set; }

        [Column("POST_DT", TypeName = "date")]
        public DateTime PostDt { get; set; }

        [Column("VALUE_DT", TypeName = "date")]
        public DateTime ValueDt { get; set; }

        [Column("TOTAL_PAID_AMT", TypeName = "decimal(18,2)")]
        public decimal TotalPaidAmt { get; set; }

        // Navigation Properties
        [ForeignKey(nameof(AgrmntId))]
        [InverseProperty(nameof(Entities.Agrmnt.PayHistHs))]
        public virtual Agrmnt Agrmnt { get; set; }

        [InverseProperty(nameof(Entities.PayHistD.PayHistH))]
        public virtual ICollection<PayHistD> PayHistDs { get; set; }
    }
}