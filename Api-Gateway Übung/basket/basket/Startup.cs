using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using basket.Data;
using basket.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace basket
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

            if (string.IsNullOrEmpty(connectionString))
            {
                services.AddEntityFrameworkNpgsql().AddDbContext<BasketDbContext>(options =>
             options.UseNpgsql(Configuration.GetConnectionString("BasketContext"))
             //options.UseNpgsql("Host=192.168.0.234;Port=5432;Database=basketDb;Username=postgres;Password=postgres;")

             );
            }
            else
            {
                services.AddEntityFrameworkNpgsql().AddDbContext<BasketDbContext>(options =>
             options.UseNpgsql(connectionString)
             //options.UseNpgsql("Host=192.168.0.234;Port=5432;Database=basketDb;Username=postgres;Password=postgres;")

             );
            }
            services.AddTransient<DbSeeder>();
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DbSeeder seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //seeder.SeedAsync(app.ApplicationServices).Wait();
            //using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            //using (var context = scope.ServiceProvider.GetService<BasketDbContext>())
            //{
            //   // context.Database.EnsureCreated();
            //    context.Database.Migrate();

            //    //var item = new BasketItem
            //    //{
            //    //    Count = 2,
            //    //    ProductName = "Hallo",

            //    //};

            //    //var basket = new CustomerBasket
            //    //{
            //    //    CustomerId = 1,
            //    //    Items = new List<BasketItem>
            //    //    {
            //    //        item
            //    //    }
            //    //};

            //    //context.Add(basket);
            //    context.SaveChanges();
            //}

        }
    }
}
