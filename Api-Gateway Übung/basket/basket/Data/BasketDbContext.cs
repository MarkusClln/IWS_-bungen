using basket.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace basket.Data
{
    public class BasketDbContext : DbContext
    {
        public BasketDbContext(DbContextOptions<BasketDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BasketItem>()
                .HasOne(p => p.CustomerBasket)
                .WithMany(b => b.Items)
                .HasForeignKey(p => p.CustomerBasketId);
        }

        public DbSet<CustomerBasket> Baskets { get; set; }
        public DbSet<BasketItem> BasketItems { get; set; }
    }
}
