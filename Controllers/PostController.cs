using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Tabloid.Models.DTOs;

namespace Tabloid.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PostController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public PostController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        List<Post> posts = _dbContext.Posts.Include(p => p.Author).ToList();

        List<PostDTO> postDTOs = posts.Select(p => new PostDTO
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
                IsActive = p.Author.IsActive
            },
            PublicationDate = p.PublicationDate,
            Body = p.Body,
            CategoryId = p.CategoryId,
            HeaderImage = p.HeaderImage,
            PostApproved = p.PostApproved,
            EstimatedReadTime = p.EstimatedReadTime
        }).ToList();

        return Ok(postDTOs);
    }

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetById(int id)
    {
        var post = _dbContext.Posts
                            .Include(p => p.Author)
                            .ThenInclude(up => up.IdentityUser)
                            .FirstOrDefault(p => p.Id == id);

        if (post == null)
        {
            return NotFound();
        }

        PostDTO postDTO = new PostDTO
        {
            Id = post.Id,
            Title = post.Title,
            AuthorId = post.AuthorId,
            Author = new UserProfileDTO
            {
                Id = post.Author.Id,
                FirstName = post.Author.FirstName,
                LastName = post.Author.LastName,
                UserName = post.Author.UserName,
                Email = post.Author.Email,
                CreateDateTime = post.Author.CreateDateTime,
                ImageLocation = post.Author.ImageLocation,
                IsActive = post.Author.IsActive,
                IdentityUser = new IdentityUser
                {
                    Id = post.Author.IdentityUser.Id,
                    UserName = post.Author.IdentityUser.UserName
                }
            },
            PublicationDate = post.PublicationDate,
            Body = post.Body,
            CategoryId = post.CategoryId,
            HeaderImage = post.HeaderImage,
            PostApproved = post.PostApproved,
            EstimatedReadTime = post.EstimatedReadTime
        };

        return Ok(postDTO);
    }

    [HttpPost]
    // [Authorize]
    public IActionResult Post(Post post)
    {
        if (post == null)
        {
            return BadRequest("Post object cannot be null");
        }

        if (string.IsNullOrEmpty(post.Title))
        {
            return BadRequest("Title is required.");
        }

        if (string.IsNullOrEmpty(post.Body))
        {
            return BadRequest("Body is required.");
        }

        post.PublicationDate = DateTime.Now;

        _dbContext.Posts.Add(post);
        _dbContext.SaveChanges();

        return Ok(new { post.Id });
    }

}