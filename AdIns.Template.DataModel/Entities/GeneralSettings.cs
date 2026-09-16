using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreSystemMini.Domain.Entities
{
    [Table("GENERAL_SETTINGS")]
    public class GeneralSettings
    {
        [Key]
        [Column("GENERAL_SETTING_ID")]
        public long GeneralSettingId { get; set; }

        [MaxLength(10)]
        [Column("LC_RATE")]
        public string LcRate { get; set; }
    }
}