using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace basket.Data
{
    public class DbSeeder
    {
        public async Task SeedAsync(IServiceProvider serviceProvider)
        {
            //Based on EF team's example at https://github.com/aspnet/MusicStore/blob/dev/samples/MusicStore/Models/SampleData.cs
            using (var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var basketDb = serviceScope.ServiceProvider.GetService<BasketDbContext>();
                if (await basketDb.Database.EnsureCreatedAsync())
                {
                    if (!await basketDb.Baskets.AnyAsync())
                    {

                        Console.WriteLine("HAAAAAAAAAAAAAAAAAAAAAALLO");
                        //await InsertCustomersSampleData(customersDb);
                    }
                }
            }
        }
    }
}
