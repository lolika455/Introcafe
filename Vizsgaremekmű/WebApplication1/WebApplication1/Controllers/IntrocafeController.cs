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
                    i.UploadedOrderId,
                    i.UploadedItems,
                    i.UploadedTakeway,
                    i.UploadedTotalCost,
                    i.UploadedOrderTime
                })
                .ToList();

            return Ok(orders);




        }



    }



}
