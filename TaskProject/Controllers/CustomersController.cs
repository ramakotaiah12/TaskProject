using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TaskProject.Dto;
using TaskProject.Models;
using TaskProject.Services;

namespace TaskProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : Controller
    {
        private ICustomerRepository _customerRepository;
        public CustomersController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }
        //api/customers
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<CustomerDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetCustomers()
        {
            var customers = _customerRepository.GetCustomers();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var customersDto = new List<CustomerDto>();
            foreach (var customer in customers)
            {
                customersDto.Add(new CustomerDto
                {
                    Id = customer.customerId,
                    Name = customer.customerName,
                   Address = customer.customerAddress

                });

            }
            return Ok(customersDto);

        }
        //api/customers/customerId
        [HttpGet("{customerId}", Name = "GetCustomer")]
        [ProducesResponseType(200, Type = typeof(CustomerDto))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult GetCustomer(int customerId)
        {
            if (!_customerRepository.CustomerExists(customerId))
            {
                return NotFound();
            }
            var customer = _customerRepository.GetCustomer(customerId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var customerDto = new CustomerDto
            {
                Id = customer.customerId,
                Name = customer.customerName,
                Address = customer.customerAddress

            };


            return Ok(customerDto);

        }
        //api/customers
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(CustomerDto))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult CreateCustomer([FromBody] Customer customer)
        {
            if (customer == null)
            {
                BadRequest(ModelState);
            }
            



            

            if (!_customerRepository.CreateCustomer(customer))
            {
                ModelState.AddModelError("", $"Something went wrong creating Customer");
                return StatusCode(500, ModelState);
            }
            return CreatedAtRoute("GetCustomer", new { customerId = customer.customerId }, customer);
        }
        //api/customers/customerId
        [HttpPut("{customerId}")]
        [ProducesResponseType(201, Type = typeof(CustomerDto))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult UpdateCustomer(int customerId,[FromBody] Customer customer)
        {
            if (customer == null)
            {
                BadRequest(ModelState);
            }
            if (customerId != customer.customerId)
            {
                return BadRequest(ModelState);
            }
            if (!_customerRepository.CustomerExists(customerId))
            {
                ModelState.AddModelError("", "Customer doesn't exists");
            }
            if (!ModelState.IsValid)
            {
                return StatusCode(404, ModelState);
            }
            if (!_customerRepository.UpdateCustomer(customer))
            {
                ModelState.AddModelError("", $"Something went wrong updating customer");
                return StatusCode(500, ModelState);
            }
            return CreatedAtRoute("GetCustomer", new { customerId = customer.customerId }, customer);
        }
        //api/customers/customerId
        [HttpDelete("{customerId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult DeleteCustomer(int customerId)
        {


            if (!_customerRepository.CustomerExists(customerId))
            {
                ModelState.AddModelError("", "Customer doesn't exists");
            }

            if (!ModelState.IsValid)
            {
                return StatusCode(404, ModelState);
            }

            var customer = _customerRepository.GetCustomer(customerId);
           
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_customerRepository.DeleteCustomer(customer))
            {
                ModelState.AddModelError("", $"Something went wrong deleting Customer");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }
    }
}
