using AdIns.Core.Service;
using AdIns.Core.Transaction;
using AdIns.DataAccess;
using AdIns.Exp.ExceptionCustomType;
using AdIns.Template.Common;
using AdIns.Template.DataAccess.Context;
using CoreSystemMini.Domain.Entities;
using AdIns.Template.DTO.Request;
using AdIns.Template.DTO.Response;
using AdIns.Template.Interface.TrObService;
using AdIns.Template.Interface.TransactionService;
using Decor;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace AdIns.Template.BusinessService.TransactionService
{
    public class DebtorTrService : BaseService, IDebtorTrService
    {
        private readonly IRepository repository;
        private readonly IAgrmntTrObService iAgrmntTrObService;

        public DebtorTrService(
            TemplateContext context,
            IHttpContextAccessor httpContextAccessor,
            Func<BaseDbContext, IRepository> repository,
            IAgrmntTrObService iAgrmntTrObService) : base(httpContextAccessor)
        {
            this.repository = repository(context);
            this.iAgrmntTrObService = iAgrmntTrObService;
        }

        [Decorate(typeof(TransactionHandler))]
        public virtual async Task<AddDebtorToAgrmntResDto> AddDebtorToAgrmnt(AddDebtorToAgrmntReqDto req)
        {
            Agrmnt agrmnt = await iAgrmntTrObService.GetAgrmntForUpdate(req.AgrmntId);
            if (agrmnt == null)
            {
                string[] arr = { "Agreement" };
                throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
            }

            string debtorNo = await iAgrmntTrObService.GenerateDebtorNo();

            char genderChar = 'M';
            if (!string.IsNullOrEmpty(req.Gender) && req.Gender.Length > 0)
            {
                genderChar = req.Gender[0];
            }

            Debtor debtor = new Debtor
            {
                DebtorNo = debtorNo,
                FullName = req.FullName,
                IdNo = req.IdNo,
                BirthDt = req.BirthDate,
                Gender = genderChar,
                Email = req.Email,
                PhoneNumber = req.PhoneNumber,
                Address = req.Address,
                City = req.City,
                ZipCode = req.Zipcode,
                Rt = req.Rt,
                Rw = req.Rw,
                Kelurahan = req.Kelurahan,
                Kecamatan = req.Kecamatan,
                Occupation = req.Occupation,
                Income = req.Income
            };

            repository.Add(debtor);
            await repository.SaveChangesAsync();

            agrmnt.DebtorId = debtor.DebtorId;
            await repository.SaveChangesAsync();

            return new AddDebtorToAgrmntResDto
            {
                DebtorId = debtor.DebtorId,
                DebtorNo = debtor.DebtorNo,
                AgrmntId = agrmnt.AgrmntId
            };
        }
    }
}
