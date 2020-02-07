using basket.Data;
using basket.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace basket.Controllers
{
    [Route("/")]
    [ApiController]
    public class CustomerBasketController : ControllerBase
    {
        private readonly BasketDbContext _context;
        public CustomerBasketController(BasketDbContext context)
        {
            _context = context;
        }

        // GET: /
        [HttpGet]
        public async Task<string> GetBaskets()
        {
            await _context.Database.MigrateAsync();

            return "Hallo";
        }

        /// <summary>
        /// Gets the basket of a customer by the customerId
        /// </summary>
        /// <param name="id">CustomerId</param>
        /// <returns></returns>
        // GET: /1
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerBasket>> GetCustomerBasket(int id)
        {
            await _context.Database.MigrateAsync();

            var customerBasket = await _context.Baskets.Include(b => b.Items).FirstOrDefaultAsync(b => b.CustomerId == id);

            if (customerBasket == null)
            {
                return NotFound();
            }

            return customerBasket;
        }

        //POST: /1
        [HttpPost("{customerId}")]
        public async Task<ActionResult<CustomerBasket>> AddItemToBasket(int customerId, [FromBody]BasketItem item)
        {
            await _context.Database.MigrateAsync();

            var customerBasket = await _context.Baskets.Include(b => b.Items).FirstOrDefaultAsync(b => b.CustomerId == customerId);

            //if there is no basket for the desired customer, create it
            if (customerBasket == null)
            {
                customerBasket = new CustomerBasket { CustomerId = customerId, Items = new List<BasketItem>() };
                _context.Baskets.Add(customerBasket);
                await _context.SaveChangesAsync();
            }

            //check if the item to be added already got added to the basket
            if (customerBasket.Items.Any(basketItem => basketItem.ProductId == item.ProductId))
            {
                //get the item and increase the count
                var product = customerBasket.Items.FirstOrDefault(basketItem => basketItem.ProductId == item.ProductId);
                product.Count++;
                await _context.SaveChangesAsync();
                return customerBasket;
            }

            //then add it to the basket
            if(item.Count == 0)
                item.Count++;
            customerBasket.Items.Add(item);
            await _context.SaveChangesAsync();

            return customerBasket;
        }

        // DELETE: /clear/1
        [HttpDelete("clear/{customerId}")]
        public async Task<ActionResult<CustomerBasket>> ClearCustomerBasket(int customerId)
        {
            await _context.Database.MigrateAsync();

            //Get basket
            var customerBasket = await _context.Baskets.Include(b => b.Items).FirstOrDefaultAsync(b => b.CustomerId == customerId);

            if (customerBasket == null)
            {
                return NotFound();
            }

            foreach (var item in customerBasket.Items)
            {
                _context.BasketItems.Remove(item);
            }
            await _context.SaveChangesAsync();

            return customerBasket;
        }
    }
}
