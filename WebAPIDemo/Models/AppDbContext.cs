using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIDemo.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().HasData(
                new Product() { Id = 1, Name = "Lux", CatId = 1, Qty = 10, Rate = 50 },
                new Product() { Id = 2, Name = "Dove", CatId = 1, Qty = 12, Rate = 55 },
                new Product() { Id = 3, Name = "Santoor", CatId = 2, Qty = 10, Rate = 105 },
                new Product() { Id = 4, Name = "Nyle", CatId = 2, Qty = 15, Rate = 200 }
                );

            modelBuilder.Entity<Category>().HasData(
              new Category { Id = 1, Name = "Soap" },
              new Category { Id = 2, Name = "Cloth" }
              );
        }
    }
}
