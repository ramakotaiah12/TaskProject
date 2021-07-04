using System;
using System.Collections.Generic;
using TaskProject.Models;

namespace TaskProject.Services
{
    public interface ICustomerRepository
    {
        ICollection<Customer> GetCustomers();
        Customer GetCustomer(int customerId);
        bool CustomerExists(int customerId);
        bool CreateCustomer(Customer customer);
        bool UpdateCustomer(Customer customer);
        bool DeleteCustomer(Customer customer);
        bool Save();
    }
}
