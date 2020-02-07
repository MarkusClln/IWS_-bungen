using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace basket.Models
{
    public class CustomerBasket
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }

        public List<BasketItem> Items { get; set; }
    }
}
