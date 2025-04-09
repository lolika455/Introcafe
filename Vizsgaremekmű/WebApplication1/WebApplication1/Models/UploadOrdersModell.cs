using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using static WebApplication1.Models.Usermodell;

namespace WebApplication1.Models
{
    [Table("upload_orders")]
    public class UploadOrdersModell
    {
            [Key]
            public int UploadedOrderId { get; set; }
            public string UploadedItems { get; set; }
            public string UploadedTakeway { get; set; }
            public long UploadedTotalCost { get; set; }
            public DateTime UploadedOrderTime { get; set; } = DateTime.Now;
    }
}
