using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIns.Template.DTO.Request
{
    public class SlikOjkSubmissionPayloadDto
    {
        public string agreementNumber { get; set; } = string.Empty;
        public string debtorNumber { get; set; } = string.Empty;
        public string namaDebtor { get; set; } = string.Empty;
        public string noKtp { get; set; } = string.Empty;
        public string alamat { get; set; } = string.Empty;
        public int besarGaji { get; set; }
        public string nomorTelp { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string assetInfo { get; set; } = string.Empty;
        public string agreementDate { get; set; } = string.Empty;
        public int tenor { get; set; }
        public int interestRate { get; set; }
        public int ntfAmt { get; set; }
        public int instAmt { get; set; }
        public int osPrincipalAmt { get; set; }
        public int osInterestAmt { get; set; }
        public int osInstallmentAmt { get; set; }
        public string contractStat { get; set; } = string.Empty;
    }
}
