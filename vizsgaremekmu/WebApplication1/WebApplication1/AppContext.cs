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
    }
}
