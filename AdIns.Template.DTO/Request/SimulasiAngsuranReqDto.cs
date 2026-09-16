using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Request
{
    public class SimulasiAngsuranReqDto
    {
        [Required]
        public long AgrmntId { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Downpayment must be greater than 0.")]
        public decimal DownpaymentAmt { get; set; }

        [Required]
        public int Tenor { get; set; }

        [Required]
        [Range(0.0001, double.MaxValue, ErrorMessage = "Interest rate must be greater than 0.")]
        public decimal InterestRate { get; set; }
    }
}
