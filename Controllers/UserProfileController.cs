using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Tabloid.Models.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public UserProfileController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.UserProfiles.ToList());
    }

    [HttpGet("withroles")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }));
    }

    [HttpPost("promote/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Promote(string id)
    {
        IdentityRole role = _dbContext.Roles.SingleOrDefault(r => r.Name == "Admin");
        _dbContext.UserRoles.Add(new IdentityUserRole<string>
        {
            RoleId = role.Id,
            UserId = id
        });
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost("demote/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Demote(string id)
    {
        IdentityRole role = _dbContext.Roles
            .SingleOrDefault(r => r.Name == "Admin");

        IdentityUserRole<string> userRole = _dbContext
            .UserRoles
            .SingleOrDefault(ur =>
                ur.RoleId == role.Id &&
                ur.UserId == id);

        _dbContext.UserRoles.Remove(userRole);
        _dbContext.SaveChanges();
        return NoContent();
    }

    //[Authorize]
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        UserProfile user = _dbContext
            .UserProfiles
            .Include(up => up.IdentityUser)
            .SingleOrDefault(up => up.Id == id);

        if (user == null)
        {
            return NotFound();
        }
        user.FirstName = user.FirstName;
        user.LastName = user.LastName;
        user.ImageLocation = user.ImageLocation;
        user.CreateDateTime = user.CreateDateTime;
        user.UserName = user.IdentityUser.UserName;
        user.Email = user.IdentityUser.Email;
        user.Roles = _dbContext.UserRoles
        .Where(ur => ur.UserId == user.IdentityUser.Id)
        .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
        .ToList();
        return Ok(user);
    }

    [HttpGet("InactiveList")]
    [Authorize(Roles ="Admin")]
    public IActionResult GetAllDeactivatedUserProfiles()
    {
        List<UserProfileDTO> userProfileDeactiveList=_dbContext.UserProfiles
                                                                .Where(up=>up.IsActive==false)
                                                                .Select(up=>new UserProfileDTO
                                                                {
                                                                    Id=up.Id,
                                                                    FirstName=up.FirstName,
                                                                    LastName=up.LastName,
                                                                    UserName=up.UserName,
                                                                    Email=up.Email 
                                                                }).ToList();
        if(userProfileDeactiveList==null)
        {
            return BadRequest("No Deactivated userProfile");
        }
        return Ok(userProfileDeactiveList);
    }

    [HttpGet("ActiveList")]
    [Authorize(Roles ="Admin")]
    public IActionResult GetAllReactivatedUserProfiles()
    {
        List<UserProfileDTO> userProfileReactiveList=_dbContext.UserProfiles
                                                                .Where(up=>up.IsActive==true)
                                                                .Select(up=>new UserProfileDTO
                                                                {
                                                                    Id=up.Id,
                                                                    FirstName=up.FirstName,
                                                                    LastName=up.LastName,
                                                                    UserName=up.UserName,
                                                                    Email=up.Email 
                                                                }).ToList();
        if(userProfileReactiveList==null)
        {
            return BadRequest("No active userProfile");
        }
        return Ok(userProfileReactiveList);
    }

    //reactivate a userProfile
    [HttpPost("{id}/activate")]
    [Authorize(Roles ="Admin")]
    public IActionResult ReactivateUserProfile(int id)
    {
        UserProfile userProfileToReactivate = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);
        if (userProfileToReactivate == null)
        {
            return NotFound();
        }
        userProfileToReactivate.IsActive=true;
        _dbContext.SaveChanges();
        return NoContent();
    }

    //deactivate a userProfile
    [HttpPost("{id}/deactivate")]
    [Authorize(Roles ="Admin")]
    public IActionResult DeactivateUserProfile(int id)
    {
        UserProfile userProfileToDeactivate = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);
        if (userProfileToDeactivate == null)
        {
            return NotFound();
        }
        userProfileToDeactivate.IsActive=false;
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult UpdateUserProfile(int id, UserProfileDTO updatedProfile)
    {
        var userProfile = _dbContext.UserProfiles
            .Include(up => up.IdentityUser)
            .FirstOrDefault(up => up.Id == id);

        if (userProfile == null)
        {
            return NotFound("User profile not found.");
        }

        userProfile.IdentityUser.UserName = updatedProfile.UserName;
        userProfile.IdentityUser.Email = updatedProfile.Email;

        var existingRoles = _dbContext.UserRoles
            .Where(ur => ur.UserId == userProfile.IdentityUserId)
            .ToList();

        _dbContext.UserRoles.RemoveRange(existingRoles);

        foreach (var role in updatedProfile.Roles)
        {
            var roleEntity = _dbContext.Roles.SingleOrDefault(r => r.Name == role);
                    if (roleEntity != null)
            {
                _dbContext.UserRoles.Add(new IdentityUserRole<string>
                {
                    UserId = userProfile.IdentityUserId,
                    RoleId = roleEntity.Id
                });
            }
        }

        try
        {
            _dbContext.SaveChanges();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_dbContext.UserProfiles.Any(up => up.Id == id))
            {
                return NotFound("User profile not found.");
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }



}