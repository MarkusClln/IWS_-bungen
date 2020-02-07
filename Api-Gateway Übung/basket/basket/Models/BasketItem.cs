using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace basket.Models
{
    public class BasketItem
    {
        public int Id { get; set; }

        [JsonIgnore]
        public CustomerBasket CustomerBasket { get; set; }
        public int CustomerBasketId { get; set; }

        public int ProductId { get; set; }

        public int Count { get; set; }
    }
}
