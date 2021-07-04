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
    public class SalesController : Controller
    {
        private ISaleRepository _saleRepository;
        private ICustomerRepository _customerRepository;
        private IProductRepository _productRepository;
        private IStoreRepository _storeRepository;
        public SalesController(ISaleRepository saleRepository,
            ICustomerRepository customerRepository,
            IProductRepository productRepository,
            IStoreRepository storeRepository)
        {
            _saleRepository = saleRepository;
            _customerRepository = customerRepository;
            _productRepository = productRepository;
            _storeRepository = storeRepository;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Sale>))]
        [ProducesResponseType(400)]
        public IActionResult GetSales()
        {
            var sales = _saleRepository.GetSales();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
           
            return Ok(sales);

        }
        //api/products/productId
        [HttpGet("{saleId}", Name = "GetSale")]
        [ProducesResponseType(200, Type = typeof(SalesDto))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult GetSale(int saleId)
        {
            if (!_saleRepository.SaleExists(saleId))
            {
                return NotFound();
            }
            var sale = _saleRepository.GetSale(saleId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var saleDto = new SalesDto
            {
                Id = sale.saleId,
                Product = sale.Product.productName,
                Customer = sale.Customer.customerName,
                Store = sale.Store.storeName,
                dateSold = sale.dateSold

            };


            return Ok(saleDto);

        }
        //api/products
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(SalesDto))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult CreateSale([FromBody] Sale sale)
        {
            if (sale == null)
            {
                BadRequest(ModelState);
            }


            var customer = _customerRepository.GetCustomer(sale.customerId);
            var product = _productRepository.GetProduct(sale.productId);
            var store = _storeRepository.GetStore(sale.saleId);

            sale.Product = product;
            sale.Customer = customer;
            sale.Store = store;

            if (!_saleRepository.CreateSale(sale))
            {
                ModelState.AddModelError("", $"Something went wrong creating sale");
                return StatusCode(500, ModelState);
            }
            return CreatedAtRoute("GetSale", new { saleId = sale.saleId }, sale);
        }
        //api/customers/productId
        [HttpPut("{saleId}")]
        [ProducesResponseType(201, Type = typeof(SalesDto))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult Updatesale(int saleId, [FromBody] Sale sale)
        {
            if (sale == null)
            {
                BadRequest(ModelState);
            }
            if (saleId != sale.saleId)
            {
                return BadRequest(ModelState);
            }
            if (!_saleRepository.SaleExists(saleId))
            {
                ModelState.AddModelError("", "Sale doesn't exists");
            }
            if (!ModelState.IsValid)
            {
                return StatusCode(404, ModelState);
            }
            var customer = _customerRepository.GetCustomer(sale.customerId);
            var product = _productRepository.GetProduct(sale.productId);
            var store = _storeRepository.GetStore(sale.saleId);

            sale.Product = product;
            sale.Customer = customer;
            sale.Store = store;
            if (!_saleRepository.UpdateSale(sale))
            {
                ModelState.AddModelError("", $"Something went wrong updating sale");
                return StatusCode(500, ModelState);
            }
            return CreatedAtRoute("GetSale", new { saleId = sale.saleId }, sale);
        }
        //api/products/productId
        [HttpDelete("{saleId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult DeleteSale(int saleId)
        {


            if (!_saleRepository.SaleExists(saleId))
            {
                ModelState.AddModelError("", "Sale doesn't exists");
            }

            if (!ModelState.IsValid)
            {
                return StatusCode(404, ModelState);
            }

            var sale = _saleRepository.GetSale(saleId);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_saleRepository.DeleteSale(sale))
            {
                ModelState.AddModelError("", $"Something went wrong deleting sale");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }
    }
}
