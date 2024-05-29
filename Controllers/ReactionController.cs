using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Microsoft.EntityFrameworkCore;
using Tabloid.Models;
using Tabloid.Models.DTOs;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReactionController:ControllerBase
{
    private TabloidDbContext _dbContext;

    public ReactionController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult CreateReaction(Reaction reaction)
    {
        if(reaction==null)
        {
            return BadRequest();
        }
        _dbContext.Add(reaction);
        _dbContext.SaveChanges();
        return Created($"/api/reaction/{reaction.Id}",reaction);
    }
}