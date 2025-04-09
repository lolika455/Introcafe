using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("users")]
    public class Usermodell
    {
            [Key]
            public long Uid { get; set; }
            public string FullName { get; set; }
            public string Password { get; set; }
            public string Email { get; set; }
            public long IntroPoints { get; set; }
    }
}
