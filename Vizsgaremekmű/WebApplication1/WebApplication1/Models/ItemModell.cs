using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("items")]
    public class ItemModell
    {
            [Key]
            public int ItemId { get; set; }
            public string Name { get; set; }
            public long Price { get; set; }
    }
}
