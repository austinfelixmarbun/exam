using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Request
{
    public class AddAgrmntAssetReqDto
    {
        [Required]
        public long AgrmntId { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "Minimal harus ada 1 baris asset.")]
        public List<AssetRowDto> Assets { get; set; } = new();
    }
}
