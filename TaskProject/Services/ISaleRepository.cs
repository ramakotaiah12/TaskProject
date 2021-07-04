using System;
using System.Collections.Generic;
using TaskProject.Models;

namespace TaskProject.Services
{
    public interface ISaleRepository
    {
        ICollection<Sale> GetSales();
        Sale GetSale(int saleId);
        bool SaleExists(int saleId);
        bool CreateSale(Sale sale);
        bool UpdateSale(Sale sale);
        bool DeleteSale(Sale sale);
        bool Save();
    }
}
