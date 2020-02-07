using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using basket.Data;
using basket.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace basket
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //CreateHostBuilder(args).Build().Run();
            var host = CreateHostBuilder(args).Build();
            //using (var scope = host.Services.CreateScope())
            //{
            //    scope.ServiceProvider.GetRequiredService<BasketDbContext>().Database.Migrate();

            //    var context = scope.ServiceProvider.GetRequiredService<BasketDbContext>();

            //    var item = new BasketItem
            //    {
            //        Count = 2,
            //        ProductId = 1,

            //    };

            //    var basket = new CustomerBasket
            //    {
            //        CustomerId = 1,
            //        Items = new List<BasketItem>
            //        {
            //            item
            //        }
            //    };

            //    context.Add(basket);
            //    context.SaveChanges();
            //}
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
