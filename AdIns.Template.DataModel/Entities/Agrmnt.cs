using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreSystemMini.Domain.Entities
{
    [Table("AGRMNT")]
    public class Agrmnt
    {
        public Agrmnt()
        {
            AgrmntAssets = new HashSet<AgrmntAsset>();
            InstSchdls = new HashSet<InstSchdl>();
            ColActivities = new HashSet<ColActivity>();
            PayHistHs = new HashSet<PayHistH>();
        }

        [Key]
        [Column("AGRMNT_ID")]
        public long AgrmntId { get; set; }

        [Column("DEBTOR_ID")]
        public long? DebtorId { get; set; }

        [Column("SALES_PERSON_ID")]
        public long SalesPersonId { get; set; }

        [Required]
        [MaxLength(20)]
        [Column("AGRMNT_NO")]
        public string AgrmntNo { get; set; }

        [Column("NTF_AMT", TypeName = "decimal(18,2)")]
        public decimal NtfAmt { get; set; }

        [Column("DOWNPAYMENT_AMT", TypeName = "decimal(18,2)")]
        public decimal DownpaymentAmt { get; set; }

        [Column("TENOR")]
        public int Tenor { get; set; }

        [Column("INTEREST_RATE", TypeName = "decimal(18,4)")]
        public decimal InterestRate { get; set; }

        [Column("INST_AMT", TypeName = "decimal(18,2)")]
        public decimal InstAmt { get; set; }

        [Column("AGRMNT_DT", TypeName = "date")]
        public DateTime AgrmntDt { get; set; }

        [Required]
        [MaxLength(5)]
        [Column("CONTRACT_STAT")]
        public string ContractStat { get; set; } = "NEW";

        [Column("OTR_AMT", TypeName = "decimal(18,2)")]
        public decimal OtrAmt { get; set; }

        [Column("OS_PRINCIPAL_AMT", TypeName = "decimal(18,2)")]
        public decimal OsPrincipalAmt { get; set; } = 0; 

        [Column("OS_INTEREST_AMT", TypeName = "decimal(18,2)")]
        public decimal OsInterestAmt { get; set; } = 0; 

        [Column("GRACE_PERIOD")]
        public int GracePeriod { get; set; }

        [ForeignKey(nameof(DebtorId))]
        [InverseProperty(nameof(Entities.Debtor.Agrmnts))]
        public virtual Debtor? Debtor { get; set; }

        [ForeignKey(nameof(SalesPersonId))]
        [InverseProperty(nameof(Entities.SalesPerson.Agrmnts))]
        public virtual SalesPerson SalesPerson { get; set; }

        [InverseProperty(nameof(Entities.AgrmntAsset.Agrmnt))]
        public virtual ICollection<AgrmntAsset> AgrmntAssets { get; set; }

        [InverseProperty(nameof(Entities.InstSchdl.Agrmnt))]
        public virtual ICollection<InstSchdl> InstSchdls { get; set; }

        [InverseProperty(nameof(Entities.ColActivity.Agrmnt))]
        public virtual ICollection<ColActivity> ColActivities { get; set; }

        [InverseProperty(nameof(Entities.PayHistH.Agrmnt))]
        public virtual ICollection<PayHistH> PayHistHs { get; set; }
    }
}