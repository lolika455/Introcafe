using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using System;
using Microsoft.AspNetCore.Components.Forms;
using System.Text.Json;

namespace WebApplication1.Controllers
{
    [ApiController]
    public class IntrocafeController : ControllerBase
    {
        private readonly AppContext appContext;

        public IntrocafeController(AppContext appContext)
        {
            this.appContext = appContext;
        }

        [HttpGet("/api/getordersnouser")]
        public IActionResult GetOrdersNoUser()
        {
            var orders = appContext.Set<UploadOrdersModell>()
                .Select(i => new
                {
                    i.uploadedOrderId,
                    i.uploadedItems,
                    i.uploadedTakeway,
                    i.uploadedTotalCost,
                    i.uploadedOrderTime
                })
                .ToList();

            return Ok(orders);
        }

        [HttpPost("/api/uploadneworder")]
        public IActionResult InsertNewOrder(dynamic uploaddata)
        {
            var model = JsonSerializer.Deserialize<UploadOrdersModell>(
                uploaddata.ToString(),
                new JsonSerializerOptions()
                {
                    PropertyNameCaseInsensitive = true
                }
            );
            appContext.Set<UploadOrdersModell>().Add(model);
            appContext.SaveChanges();
            return StatusCode(200, new
            {
                model.uploadedOrderId
            });
        }
    }
}
