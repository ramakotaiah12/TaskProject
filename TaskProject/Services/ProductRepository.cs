using System;
using System.Collections.Generic;
using System.Linq;
using TaskProject.Models;

namespace TaskProject.Services
{
    public class ProductRepository : IProductRepository
    {
        private TaskDbContext _productContext;
        public ProductRepository(TaskDbContext taskDbContext)
        {
            _productContext = taskDbContext;
        }

        public bool CreateProduct(Product product)
        {
            _productContext.Add(product);
            return Save();
        }

        public bool DeleteProduct(Product product)
        {
            _productContext.Remove(product);
            return Save();
        }

        public Product GetProduct(int productId)
        {
            return _productContext.Products.Where(p => p.productId == productId).FirstOrDefault();
        }

        public ICollection<Product> GetProducts()
        {
            return _productContext.Products.OrderBy(p => p.productId).ToList();
        }

        public bool Save()
        {
            var saved = _productContext.SaveChanges();
            return saved >= 0 ? true : false;
        }

        public bool UpdateProduct(Product product)
        {
            _productContext.Update(product);
            return Save();
        }

        public bool ProductExists(int productId)
        {
            return _productContext.Products.Any(p => p.productId == productId);
        }
    }
}
