using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;

namespace WebApplication1.Models
{
    [Table("upload_orders")]
    public class UploadOrdersModell
    {
            [Key]
            public int uploadedOrderId { get; set; }
            public long uploadedUserId { get; set; }
            public long uploadedUsedIntropoints { get; set; }
            public string uploadedItems { get; set; }
            public string uploadedTakeway { get; set; }
            public long uploadedTotalCost { get; set; }
            public DateTime uploadedOrderTime { get; set; } = DateTime.Now;

            //public UsersModell Users { get; set; }

    }
}
