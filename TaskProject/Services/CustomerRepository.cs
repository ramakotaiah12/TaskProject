using System;
using System.Collections.Generic;
using System.Linq;
using TaskProject.Models;

namespace TaskProject.Services
{
    public class CustomerRepository : ICustomerRepository
    {
        private TaskDbContext _customerContext;
        public CustomerRepository(TaskDbContext taskDbContext)
        {
            _customerContext = taskDbContext;
        }

        public bool CreateCustomer(Customer customer)
        {
            _customerContext.Add(customer);
            return Save();
        }

        public bool DeleteCustomer(Customer customer)
        {
            _customerContext.Remove(customer);
            return Save();
        }

        public Customer GetCustomer(int customerId)
        {
            return _customerContext.Customers.Where(c => c.customerId == customerId).FirstOrDefault();
        }

        public ICollection<Customer> GetCustomers()
        {
            return _customerContext.Customers.OrderBy(a => a.customerId).ToList();
        }

        public bool Save()
        {
            var saved = _customerContext.SaveChanges();
            return saved >= 0 ? true : false;
        }

        public bool UpdateCustomer(Customer customer)
        {
            _customerContext.Update(customer);
            return Save();
        }

        public bool CustomerExists(int customerId)
        {
            return _customerContext.Customers.Any(c => c.customerId == customerId);
        }
    }
}
