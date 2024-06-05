using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Tabloid.Models;
using Tabloid.Data;
using Tabloid.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel;


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

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetById(int id)
    {
        Category category = _dbContext.Categories.FirstOrDefault(c => c.Id == id);
        if (category == null)
        {
            return NotFound();
        }
        CategoryDTO categoryDTO = new CategoryDTO
        {
            Id = category.Id,
            Name = category.Name
        };
        return Ok(categoryDTO);
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

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Put([FromBody] Category updatedCat, int id)
    {
        Category currentCat = _dbContext.Categories.FirstOrDefault(c => c.Id == id);
        if (currentCat.Id == null)
        {
            return BadRequest("Invalid Category Selected");
        }
        currentCat.Name = updatedCat.Name ?? currentCat.Name;
        _dbContext.SaveChanges();
        return Ok(currentCat);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]

    public IActionResult Delete(int id)
    {
        Category chosenCat = _dbContext.Categories.SingleOrDefault(cc => cc.Id == id);

        if (chosenCat == null)
        {
            return NotFound("Category Not Found");
        }
        _dbContext.Categories.Remove(chosenCat);
        _dbContext.SaveChanges();
        return NoContent();
    }
}