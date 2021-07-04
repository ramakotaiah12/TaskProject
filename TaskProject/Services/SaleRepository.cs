using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TaskProject.Models;

namespace TaskProject.Services
{
    public class SaleRepository : ISaleRepository
    {
        private TaskDbContext _saleContext;
        public SaleRepository(TaskDbContext taskDbContext)
        {
            _saleContext = taskDbContext;
        }

        public bool CreateSale(Sale sale)
        {
            _saleContext.Add(sale);
            return Save();
        }

        public bool DeleteSale(Sale sale)
        {
            _saleContext.Remove(sale);
            return Save();
        }

        public Sale GetSale(int saleId)
        {
            return _saleContext.Sales.Where(s => s.saleId == saleId).FirstOrDefault();
        }

        public ICollection<Sale> GetSales()
        {
            return _saleContext.Sales.AsNoTracking().OrderBy(s => s.saleId)
                .Include(s=> s.Store)
                .Include(s=> s.Product)
                .Include(s=>s.Customer)
                .ToList();
        }

        public bool Save()
        {
            var saved = _saleContext.SaveChanges();
            return saved >= 0 ? true : false;
        }

        public bool UpdateSale(Sale sale)
        {
            _saleContext.Update(sale);
            return Save();
        }

       public bool SaleExists(int saleId)
        {
            return _saleContext.Sales.Any(s => s.saleId == saleId);
        }
    }
}
