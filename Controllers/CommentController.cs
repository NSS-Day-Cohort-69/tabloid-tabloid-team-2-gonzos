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
            PostId = c.PostId,
            CreationDate = c.CreationDate,
            Subject = c.Subject,
            Content = c.Content
        }).ToList());
    }

    [HttpPost("posts/{postId}")]
    public IActionResult PostComment(int postId, int AuthorId, string Subject, string Content)
    {
        if (AuthorId == 0 || Subject == null || Content == null)
        {
            return BadRequest();
        }
        
        _dbContext.Comments.Add(new Comment
        {
            AuthorId = AuthorId,
            PostId = postId,
            CreationDate = DateTime.Now,
            Subject = Subject,
            Content = Content
        });
        
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{commentId}")]
    public IActionResult DeleteComment(int commentId)
    {
        Comment commentToBeRemoved = _dbContext.Comments.FirstOrDefault(c => c.Id == commentId);
        
        if (commentToBeRemoved == null)
        {
            return BadRequest();
        }

        _dbContext.Comments.Remove(commentToBeRemoved);
        _dbContext.SaveChanges();
        return Ok();
    }
}