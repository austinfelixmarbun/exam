using System;
using System.ComponentModel.DataAnnotations;

namespace AdIns.Template.DTO.Request
{
    public class AddAgrmntReqDto
    {
        [Required]
        public DateTime AgreementDate { get; set; }

        [Required]
        [Range(1, 5, ErrorMessage = "Grace period must be between 1 and 5 days.")]
        public int GracePeriod { get; set; }

        [Required]
        public long SalesPersonId { get; set; }
    }
}