using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreSystemMini.Domain.Entities
{
    [Table("DEBTOR")]
    public class Debtor
    {
        public Debtor()
        {
            Agrmnts = new HashSet<Agrmnt>();
        }

        [Key]
        [Column("DEBTOR_ID")]
        public long DebtorId { get; set; }

        [Required]
        [MaxLength(20)]
        [Column("DEBTOR_NO")]
        public string DebtorNo { get; set; }  // CUST-00001

        [Required]
        [MaxLength(100)]
        [Column("FULL_NAME")]
        public string FullName { get; set; }

        [Required]
        [MaxLength(20)]
        [Column("ID_NO")]
        public string IdNo { get; set; }

        [MaxLength(200)]
        [Column("ADDRESS")]
        public string Address { get; set; }

        [MaxLength(100)]
        [Column("CITY")]
        public string City { get; set; }

        [MaxLength(10)]
        [Column("ZIP_CODE")]
        public string ZipCode { get; set; }

        [Column("INCOME", TypeName = "decimal(18,2)")]
        public decimal Income { get; set; }

        [MaxLength(15)]
        [Column("PHONE_NUMBER")]
        public string PhoneNumber { get; set; }

        [MaxLength(100)]
        [Column("EMAIL")]
        public string Email { get; set; }

        [Column("RT")]
        public int? Rt { get; set; }

        [Column("RW")]
        public int? Rw { get; set; }

        [MaxLength(100)]
        [Column("KELURAHAN")]
        public string Kelurahan { get; set; }

        [MaxLength(100)]
        [Column("KECAMATAN")]
        public string Kecamatan { get; set; }

        [Column("BIRTH_DT", TypeName = "date")]
        public DateTime BirthDt { get; set; }

        [Column("GENDER")]
        public char Gender { get; set; }

        [MaxLength(50)]
        [Column("OCCUPATION")]
        public string Occupation { get; set; }

        [InverseProperty(nameof(Entities.Agrmnt.Debtor))]
        public virtual ICollection<Agrmnt> Agrmnts { get; set; }
    }
}