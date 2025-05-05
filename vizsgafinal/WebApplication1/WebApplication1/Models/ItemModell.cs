using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("items")]
    public class ItemModell
    {
            [Key]
            public int itemId { get; set; }
            public string name { get; set; }
            public long price { get; set; }
    }
}
