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
    public class ProductsController : Controller
    {
        private IProductRepository _productRepository;
        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        //api/products
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ProductDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetProducts()
        {
            var products = _productRepository.GetProducts();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var productsDto = new List<ProductDto>();
            foreach (var product in products)
            {
                productsDto.Add(new ProductDto
                {
                    Id = product.productId,
                    Name = product.productName,
                    Price = product.productPrice

                });

            }
            return Ok(productsDto);

        }
        //api/products/productId
        [HttpGet("{productId}", Name = "GetProduct")]
        [ProducesResponseType(200, Type = typeof(ProductDto))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult GetProduct(int productId)
        {
            if (!_productRepository.ProductExists(productId))
            {
                return NotFound();
            }
            var product = _productRepository.GetProduct(productId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var productDto = new ProductDto
            {
                Id = product.productId,
                Name = product.productName,
                Price = product.productPrice

            };


            return Ok(productDto);

        }
        //api/products
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ProductDto))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult CreateProduct([FromBody] Product product)
        {
            if (product == null)
            {
                BadRequest(ModelState);
            }






            if (!_productRepository.CreateProduct(product))
            {
                ModelState.AddModelError("", $"Something went wrong creating Product");
                return StatusCode(500, ModelState);
            }
            return CreatedAtRoute("GetProduct", new { productId = product.productId }, product);
        }
        //api/customers/productId
        [HttpPut("{productId}")]
        [ProducesResponseType(201, Type = typeof(ProductDto))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult UpdateCustomer(int productId, [FromBody] Product product)
        {
            if (product == null)
            {
                BadRequest(ModelState);
            }
            if (productId!= product.productId)
            {
                return BadRequest(ModelState);
            }
            if (!_productRepository.ProductExists(productId))
            {
                ModelState.AddModelError("", "Product doesn't exists");
            }
            if (!ModelState.IsValid)
            {
                return StatusCode(404, ModelState);
            }
            if (!_productRepository.UpdateProduct(product))
            {
                ModelState.AddModelError("", $"Something went wrong updating product");
                return StatusCode(500, ModelState);
            }
            return CreatedAtRoute("GetProduct", new { productId = product.productId }, product);
        }
        //api/products/productId
        [HttpDelete("{productId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult DeleteProduct(int productId)
        {


            if (!_productRepository.ProductExists(productId))
            {
                ModelState.AddModelError("", "Product doesn't exists");
            }

            if (!ModelState.IsValid)
            {
                return StatusCode(404, ModelState);
            }

            var product = _productRepository.GetProduct(productId);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_productRepository.DeleteProduct(product))
            {
                ModelState.AddModelError("", $"Something went wrong deleting product");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }
    }
}
