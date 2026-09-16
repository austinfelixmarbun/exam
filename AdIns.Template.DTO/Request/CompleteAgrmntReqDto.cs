using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Request
{
    public class CompleteAgrmntReqDto
    {
        [Required]
        public long AgrmntId { get; set; }

        [Required]
        public decimal DownpaymentAmt { get; set; }

        [Required]
        public int Tenor { get; set; }

        [Required]
        public decimal InterestRate { get; set; }

        [Required]
        public decimal InstAmt { get; set; }
    }
}
