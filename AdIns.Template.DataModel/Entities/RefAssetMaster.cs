using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreSystemMini.Domain.Entities
{
    [Table("REF_ASSET_MASTER")]
    public class RefAssetMaster
    {
        public RefAssetMaster()
        {
            AgrmntAssets = new HashSet<AgrmntAsset>();
        }

        [Key]
        [Column("REF_ASSET_MASTER_ID")]
        public long RefAssetMasterId { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("ASSET_NAME")]
        public string AssetName { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("ASSET_CATEGORY")]
        public string AssetCategory { get; set; }

        [Column("ASSET_PRICE", TypeName = "decimal(18,2)")]
        public decimal AssetPrice { get; set; }

        [Column("IS_ACTIVE")]
        public bool IsActive { get; set; }

        [InverseProperty(nameof(Entities.AgrmntAsset.RefAssetMaster))]
        public virtual ICollection<AgrmntAsset> AgrmntAssets { get; set; }
    }
}