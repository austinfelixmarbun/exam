using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreSystemMini.Domain.Entities
{
    [Table("MASTER_SEQUENCE")]
    public class MasterSequence
    {
        [Key]
        [Column("MASTER_SEQUENCE_ID")]
        public long MasterSequenceId { get; set; }

        [Required]
        [MaxLength(10)]
        [Column("MASTER_SEQ_CODE")]
        public string MasterSeqCode { get; set; }

        [Column("SEQ_NO")]
        public int SeqNo { get; set; }
    }
}