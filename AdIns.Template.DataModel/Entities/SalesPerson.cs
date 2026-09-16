using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreSystemMini.Domain.Entities
{
    [Table("SALES_PERSON")]
    public class SalesPerson
    {
        public SalesPerson()
        {
            Agrmnts = new HashSet<Agrmnt>();
        }

        [Key]
        [Column("SALES_PERSON_ID")]
        public long SalesPersonId { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("SALES_PERSON_NAME")]
        public string SalesPersonName { get; set; }

        [Required]
        [MaxLength(10)]
        [Column("SALES_NIK")]
        public string SalesNik { get; set; }

        [InverseProperty(nameof(Entities.Agrmnt.SalesPerson))]
        public virtual ICollection<Agrmnt> Agrmnts { get; set; }
    }
}