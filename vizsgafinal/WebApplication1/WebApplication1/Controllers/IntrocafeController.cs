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

        [HttpGet("/api/auth/check-email")]
        public IActionResult CheckEmail(string email)
        {
            var existingUser = appContext.Set<UsersModell>().FirstOrDefault(u => u.email == email);
            if (existingUser != null)
            {
                return Ok(new { exists = true });
            }
            return Ok(new { exists = false });
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

            appContext.Set<UsersModell>().Add(user);
            appContext.SaveChanges();

            return StatusCode(200, new { message = "Registration successful." });
        }

        [HttpGet("/api/auth/login")]
        public IActionResult Login([FromQuery] string email, [FromQuery] string password)
        {
            var user = appContext.Set<UsersModell>().FirstOrDefault(u => u.email == email);
            if (user == null)
            {
                return StatusCode(400, new { message = "Invalid email or password." });
            }

            if (password != user.password)
            {
                return StatusCode(400, new { message = "Invalid email or password." });
            }

            return StatusCode(200, new
            {
                uid = user.uid,
                email = user.email,
            });
        }

        [HttpGet("/api/user/intropoints")]
        public IActionResult GetIntropoints([FromQuery] long uid)
        {
            var user = appContext.Set<UsersModell>().FirstOrDefault(u => u.uid == uid);
            if (user == null)
            {
                return StatusCode(404, new { message = "User not found." });
            }

            return StatusCode(200, new { intropoints = user.intropoints });
        }

        [HttpPost("/api/user/update-intropoints")]
        public IActionResult UpdateUserIntropoints([FromBody] UpdateIntropointsRequest request)
        {
            if (request == null || request.Uid <= 0)
            {
                return BadRequest(new { message = "Invalid request data." });
            }

            var user = appContext.Set<UsersModell>().FirstOrDefault(u => u.uid == request.Uid);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            user.intropoints = request.NewIntropoints;
            appContext.SaveChanges();

            return Ok(new { message = "User Intropoints updated successfully." });
        }

        public class UpdateIntropointsRequest
        {
            public long Uid { get; set; }
            public long NewIntropoints { get; set; }
        }
    }
}
