using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1
{
    public class AppContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("server=localhost;database=introcafe;uid=root;pwd=;charset=utf8;");
        }
        public DbSet<ItemModell> Items {  get; set; }
        public DbSet<UploadOrdersModell> UploadOrders { get; set; }
        public DbSet<UsersModell> Users { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    // Configure the relationship between UploadOrdersModell and UsersModell
        //    modelBuilder.Entity<UploadOrdersModell>()
        //        .HasOne(uo => uo.Users) // Navigation property in UploadOrdersModell
        //        .WithMany(u => u.Orders) // Navigation property in UsersModell
        //        .HasForeignKey(uo => uo.uploadedUserId);
        //}

    }
}
