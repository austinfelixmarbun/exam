using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Request
{
    public class InputPaymentReqDto
    {
        [Required]
        public string AgrmntNo { get; set; } = string.Empty;

        [Required]
        public DateTime ValueDate { get; set; }

        [Required]
        public decimal PaymentAmount { get; set; }

        public string? Notes { get; set; }
    }
}
