using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Tabloid.Models;
using Tabloid.Data;
using Tabloid.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;


namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]

public class CategoryController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public CategoryController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Categories.Select(c => new CategoryDTO
        {
            Id = c.Id,
            Name = c.Name
        }).ToList());
    }


    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult CreateCategory(Category category)
    {
        if (category == null)
        {
            return BadRequest("Invalid Category Entered");
        }
        _dbContext.Add(category);
        _dbContext.SaveChanges();
        return Created($"/api/category/{category.Id}", category);
    }
}
