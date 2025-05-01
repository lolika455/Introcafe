using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using System;
using Microsoft.AspNetCore.Components.Forms;
using System.Text.Json;
using Org.BouncyCastle.Crypto.Generators;

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

        [HttpPost("/api/auth/register")]
        public IActionResult Register(dynamic registrationData)
        {
            var user = JsonSerializer.Deserialize<UsersModell>(
                registrationData.ToString(),
                new JsonSerializerOptions()
                {
                    PropertyNameCaseInsensitive = true
                }
            );

            //string user_email = registrationData.email;
            //var existingUser = appContext.Set<UsersModell>().FirstOrDefault(u => u.email == user_email);
            //if (existingUser != null)
            //{
            //    return StatusCode(400, new { message = "User already exists." });
            //}

            appContext.Set<UsersModell>().Add(user);
            appContext.SaveChanges();

            return StatusCode(200, new { message = "Registration successful." });
        }

        [HttpGet("/api/auth/login")]
        public IActionResult Login([FromQuery] string email, [FromQuery] string password)
        {
            // Find the user by email
            var user = appContext.Set<UsersModell>().FirstOrDefault(u => u.email == email);
            if (user == null)
            {
                return StatusCode(400, new { message = "Invalid email or password." });
            }

            // Verify the password
            if (password != user.password)
            {
                return StatusCode(400, new { message = "Invalid email or password." });
            }

            // Return user data (e.g., ID, email) and a placeholder token
            return StatusCode(200, new
            {
                uid = user.uid,
                email = user.email,
            });
        }





















    }
}
