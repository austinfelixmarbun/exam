using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Request
{
    public class SubmitCollectionActivityReqDto
    {
        [Required]
        public string AgrmntNo { get; set; } = string.Empty;

        [Required]
        public DateTime ActivityDate { get; set; }

        [Required]
        [RegularExpression("^(Success|Failed)$", ErrorMessage = "ActivityResult must be 'Success' or 'Failed'")]
        public string ActivityResult { get; set; } = string.Empty;

        public decimal? PaidAmount { get; set; }

        [Required]
        public string Notes { get; set; } = string.Empty;
    }
}
