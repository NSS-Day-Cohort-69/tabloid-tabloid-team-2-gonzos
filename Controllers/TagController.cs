using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Models.DTOs;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TagController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public TagController(TabloidDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public IActionResult Get()
    {
        var tags = _dbContext.Tags.OrderBy(t => t.Name).Select(t => new TagDTO 
        {
            Id = t.Id, 
            Name = t.Name

        }).ToList();

        return Ok(tags);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult CreateTag(Tag tag)
    {
        if(tag == null || string.IsNullOrWhiteSpace(tag.Name))
        {
            return BadRequest("Invalid tag data");
        }

        _dbContext.Add(tag);
        _dbContext.SaveChanges();

        return Created($"/api/tag/{tag.Id}", tag);
    }
}
