using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Models.DTOs;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommentController : ControllerBase
{
    private TabloidDbContext _dbContext;
    public CommentController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet("posts/{postId}")]
    public IActionResult PostsComments(int postId)
    {
        return Ok(_dbContext.Comments
        .Include(c => c.Author)
        .Where(c => c.PostId == postId)
        .Select(c => new CommentDTO
        {
            Id = c.Id,
            AuthorId = c.AuthorId,
            Author = new UserProfileDTO
            {
                Id = c.Author.Id,
                FirstName = c.Author.FirstName,
                LastName = c.Author.LastName,
                UserName = c.Author.UserName,
                Email = c.Author.Email,
                CreateDateTime = c.Author.CreateDateTime,
                ImageLocation = c.Author.ImageLocation,
                IdentityUserId = c.Author.IdentityUserId,
                IsActive = c.Author.IsActive
            },
            CreationDate = c.CreationDate,
            Subject = c.Subject,
            Content = c.Content
        }).ToList());
    }
}