using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("users")]
    public class UsersModell
    {
        [Key]
        public long uid { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public long intropoints { get; set; }
    }
}
