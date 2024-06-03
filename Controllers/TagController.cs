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
        var tags = _dbContext
            .Tags.OrderBy(t => t.Name)
            .Select(t => new TagDTO { Id = t.Id, Name = t.Name })
            .ToList();

        return Ok(tags);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult CreateTag(Tag tag)
    {
        if (tag == null || string.IsNullOrWhiteSpace(tag.Name))
        {
            return BadRequest("Invalid tag data");
        }

        _dbContext.Add(tag);
        _dbContext.SaveChanges();

        return Created($"/api/tag/{tag.Id}", tag);
    }

    [HttpGet("search")]
    [Authorize]
    public IActionResult SearchTag(string name)
    {
        string lowerCaseName = name.ToLower();

        Tag tag = _dbContext.Tags.Where(t => t.Name.ToLower() == lowerCaseName).FirstOrDefault();

        if (tag == null)
        {
            return NotFound();
        }

        TagDTO tagDTO = new TagDTO { Id = tag.Id, Name = tag.Name };

        return Ok(tagDTO);
    }

    [HttpGet("posts/searchPostsByTag/{tagName}")]
    [Authorize]
    public IActionResult SearchPostsByTag(string tagName)
    {
        string lowerCaseTagName = tagName.ToLower();

        List<Post> posts = _dbContext
            .Posts.Include(p => p.Author)
            .ThenInclude(up => up.IdentityUser)
            .Include(p => p.PostTags)
            .ThenInclude(pt => pt.Tag)
            .Where(p => p.PostTags.Any(pt => pt.Tag.Name.ToLower() == lowerCaseTagName))
            .ToList();

        List<PostDTO> postDTOs = posts
            .Select(p => new PostDTO
            {
                Id = p.Id,
                Title = p.Title,
                AuthorId = p.AuthorId,
                Author = new UserProfileDTO
                {
                    Id = p.Author.Id,
                    FirstName = p.Author.FirstName,
                    LastName = p.Author.LastName,
                    UserName = p.Author.UserName,
                    Email = p.Author.Email,
                    CreateDateTime = p.Author.CreateDateTime,
                    ImageLocation = p.Author.ImageLocation,
                    IdentityUserId = p.Author.IdentityUserId,
                    IsActive = p.Author.IsActive,
                    IdentityUser = new IdentityUser
                    {
                        Id = p.Author.IdentityUser.Id,
                        UserName = p.Author.IdentityUser.UserName
                    }
                },
                PublicationDate = p.PublicationDate,
                Body = p.Body,
                CategoryId = p.CategoryId,
                HeaderImage = p.HeaderImage,
                PostApproved = p.PostApproved,
                EstimatedReadTime = p.EstimatedReadTime,
                Tags = p
                    .PostTags.Select(pt => new TagDTO { Id = pt.Tag.Id, Name = pt.Tag.Name })
                    .ToList()
            })
            .ToList();

        return Ok(postDTOs);
    }
}
