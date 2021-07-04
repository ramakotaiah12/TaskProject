using System;
using Microsoft.EntityFrameworkCore;
using TaskProject.Models;

namespace TaskProject.Services
{
    public class TaskDbContext :DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options)
            : base(options)
        {
            Database.Migrate();
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<Sale> Sales { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Sale>()
                        .HasOne(p => p.Product)
                        .WithMany(p => p.sales)
                        .HasForeignKey(s => s.productId);
            modelBuilder.Entity<Sale>()
                      .HasOne(c => c.Customer)
                      .WithMany(c => c.sales)
                      .HasForeignKey(s => s.customerId);

            modelBuilder.Entity<Sale>()
                      .HasOne(s => s.Store)
                      .WithMany(s => s.sales)
                      .HasForeignKey(s => s.storeId);

            modelBuilder.Entity<Customer>()
                .HasMany(c => c.sales)
                .WithOne(s => s.Customer);
            modelBuilder.Entity<Product>()
                .HasMany(p => p.sales)
                .WithOne(s => s.Product);
            modelBuilder.Entity<Store>()
                .HasMany(s => s.sales)
                .WithOne(s => s.Store);

        }

       
    }
}
