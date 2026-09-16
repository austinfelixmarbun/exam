using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Request
{
    public class CreditApprovalReqDto
    {
        [Required]
        public string AgreementNo { get; set; } = string.Empty;

        [Required]
        [RegularExpression("^(Acc|Reject)$", ErrorMessage = "Status must be 'Acc' or 'Reject'")]
        public string Status { get; set; } = string.Empty;
    }
}
