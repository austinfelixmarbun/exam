using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Request
{
    public class AssetRowDto
    {
        [Required]
        public long RefAssetMasterId { get; set; }

        [Required]
        [MaxLength(100)]
        public string AssetDetailInfo { get; set; } = string.Empty;
    }
}
