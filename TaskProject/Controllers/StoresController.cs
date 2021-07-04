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
    public class StoresController : Controller
    {
        private IStoreRepository _storeRepository;
        public StoresController(IStoreRepository storeRepository)
        {
            _storeRepository = storeRepository;
        }
        //api/products
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<StoreDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetStores()
        {
            var stores = _storeRepository.GetStores();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var storesDto = new List<StoreDto>();
            foreach (var store in stores)
            {
                storesDto.Add(new StoreDto
                {
                    Id = store.storeId,
                    Name = store.storeName,
                    Address = store.storeAddress

                });

            }
            return Ok(storesDto);

        }
        //api/products/productId
        [HttpGet("{storeId}", Name = "GetStore")]
        [ProducesResponseType(200, Type = typeof(StoreDto))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult GetStore(int storeId)
        {
            if (!_storeRepository.StoreExists(storeId))
            {
                return NotFound();
            }
            var store = _storeRepository.GetStore(storeId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var storeDto = new StoreDto
            {
                Id = store.storeId,
                Name = store.storeName,
                Address = store.storeAddress


            };


            return Ok(storeDto);

        }
        //api/products
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(StoreDto))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult CreateStore([FromBody] Store store)
        {
            if (store == null)
            {
                BadRequest(ModelState);
            }






            if (!_storeRepository.CreateStore(store))
            {
                ModelState.AddModelError("", $"Something went wrong creating store");
                return StatusCode(500, ModelState);
            }
            return CreatedAtRoute("GetStore", new { storeId = store.storeId }, store);
        }
        //api/customers/productId
        [HttpPut("{storeId}")]
        [ProducesResponseType(201, Type = typeof(StoreDto))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult UpdateStore(int storeId, [FromBody] Store store)
        {
            if (store == null)
            {
                BadRequest(ModelState);
            }
            if (storeId != store.storeId)
            {
                return BadRequest(ModelState);
            }
            if (!_storeRepository.StoreExists(storeId))
            {
                ModelState.AddModelError("", "Store doesn't exists");
            }
            if (!ModelState.IsValid)
            {
                return StatusCode(404, ModelState);
            }
            if (!_storeRepository.UpdateStore(store))
            {
                ModelState.AddModelError("", $"Something went wrong updating store");
                return StatusCode(500, ModelState);
            }
            return CreatedAtRoute("GetStore", new { storeId = store.storeId }, store);
        }
        //api/products/productId
        [HttpDelete("{storeId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult DeleteStore(int storeId)
        {


            if (!_storeRepository.StoreExists(storeId))
            {
                ModelState.AddModelError("", "Store doesn't exists");
            }

            if (!ModelState.IsValid)
            {
                return StatusCode(404, ModelState);
            }

            var store = _storeRepository.GetStore(storeId);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_storeRepository.DeleteStore(store))
            {
                ModelState.AddModelError("", $"Something went wrong deleting store");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }
    }
}
