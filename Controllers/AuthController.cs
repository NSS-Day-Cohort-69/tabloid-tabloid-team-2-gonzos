using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using Tabloid.Models;
using Tabloid.Data;

namespace Tabloid.Controllers;


[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private TabloidDbContext _dbContext;
    private UserManager<IdentityUser> _userManager;

    public AuthController(TabloidDbContext context, UserManager<IdentityUser> userManager)
    {
        _dbContext = context;
        _userManager = userManager;
    }

    [HttpPost("login")]
    public IActionResult Login([FromHeader(Name = "Authorization")] string authHeader)
    {
        try
        {
            string encodedCreds = authHeader.Substring(6).Trim();
            string creds = Encoding
            .GetEncoding("iso-8859-1")
            .GetString(Convert.FromBase64String(encodedCreds));

            // Get email and password
            int separator = creds.IndexOf(':');
            string email = creds.Substring(0, separator);
            string password = creds.Substring(separator + 1);

            var user = _dbContext.Users.Where(u => u.Email == email).FirstOrDefault();
            var userRoles = _dbContext.UserRoles.Where(ur => ur.UserId == user.Id).ToList();
            var hasher = new PasswordHasher<IdentityUser>();
            var result = hasher.VerifyHashedPassword(user, user.PasswordHash, password);
            if (user != null && result == PasswordVerificationResult.Success)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)

                };

                foreach (var userRole in userRoles)
                {
                    var role = _dbContext.Roles.FirstOrDefault(r => r.Id == userRole.RoleId);
                    claims.Add(new Claim(ClaimTypes.Role, role.Name));
                }

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity)).Wait();

                return Ok();
            }

            return new UnauthorizedResult();
        }
        catch (Exception ex)
        {
            return StatusCode(500);
        }
    }

    [HttpGet]
    [Route("logout")]
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    public IActionResult Logout()
    {
        try
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme).Wait();
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500);
        }
    }

    [HttpGet("Me")]
    [Authorize]
    public IActionResult Me()
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);
        var roles = User.FindAll(ClaimTypes.Role).Select(r => r.Value).ToList();
        if (profile != null)
        {
            profile.UserName = User.FindFirstValue(ClaimTypes.Name);
            profile.Email = User.FindFirstValue(ClaimTypes.Email);
            profile.Roles = roles;
            return Ok(profile);
        }
        return NotFound();
    }

    // public async Task<IActionResult> Register([FromForm] UserRegistrationModel model, IFormFile file)
    //     {
    //         if (file == null || file.Length == 0)
    //         {
    //             return BadRequest("No file uploaded.");
    //         }

    //         var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

    //         if (!Directory.Exists(uploadPath))
    //         {
    //             Directory.CreateDirectory(uploadPath);
    //         }

    //         var filePath = Path.Combine(uploadPath, file.FileName);

    //         using (var stream = new FileStream(filePath, FileMode.Create))
    //         {
    //             await file.CopyToAsync(stream);
    //         }

    //         // Here you would typically save the user data and the file path to your database.

    //         return Ok(new { model.FirstName, model.LastName, model.Email, FilePath = filePath });
    //     }

    [HttpPost("register")]
    public async Task<IActionResult> Register(Registration registration)
    {
        var user = new IdentityUser
        {
            UserName = registration.UserName,
            Email = registration.Email
        };

        var password = Encoding
            .GetEncoding("iso-8859-1")
            .GetString(Convert.FromBase64String(registration.Password));           

        var result = await _userManager.CreateAsync(user, password);
        if (result.Succeeded)
        {
            string imagePath="";
            if(registration.ImageLocation!=null)
            {
                imagePath = await SaveImage(registration.ImageLocation);
            }
            else{
                imagePath=null;
            }
            
            _dbContext.UserProfiles.Add(new UserProfile
            {
                FirstName = registration.FirstName,
                LastName = registration.LastName,
                ImageLocation = imagePath,
                CreateDateTime = DateTime.Now,
                IdentityUserId = user.Id,
            });
            _dbContext.SaveChanges();

            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)

                };
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity)).Wait();

            return Ok();
        }
        return BadRequest(new { Errors = result.Errors.Select(ir => ir.Description) });
    }

    [NonAction]
    public async Task<string> SaveImage(IFormFile imageFile)
    {
        string imageName = Guid.NewGuid() + Path.GetExtension (imageFile.FileName);
        var imagePath = Path. Combine(Directory.GetCurrentDirectory(), "Uploads",imageName);
        using (var fileStream = new FileStream(imagePath, FileMode.Create))
        {
          await imageFile.CopyToAsync(fileStream);
        }
        return imageName;
    }
}