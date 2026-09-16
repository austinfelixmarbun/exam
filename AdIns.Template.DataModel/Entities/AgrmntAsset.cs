using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreSystemMini.Domain.Entities
{
    [Table("AGRMNT_ASSET")]
    public class AgrmntAsset
    {
        [Key]
        [Column("AGRMNT_ASSET_ID")]
        public long AgrmntAssetId { get; set; }

        [Column("AGRMNT_ID")]
        public long AgrmntId { get; set; }

        [Column("REF_ASSET_MASTER_ID")]
        public long RefAssetMasterId { get; set; }

        [MaxLength(100)]
        [Column("ASSET_DETAIL_INFO")]
        public string AssetDetailInfo { get; set; }

        [ForeignKey(nameof(AgrmntId))]
        [InverseProperty(nameof(Entities.Agrmnt.AgrmntAssets))]
        public virtual Agrmnt Agrmnt { get; set; }

        [ForeignKey(nameof(RefAssetMasterId))]
        [InverseProperty(nameof(Entities.RefAssetMaster.AgrmntAssets))]
        public virtual RefAssetMaster RefAssetMaster { get; set; }
    }
}