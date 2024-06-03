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
        List<Post> posts = _dbContext.Posts
                                    .Include(p => p.Author)
                                    .ThenInclude(up => up.IdentityUser)
                                    .Include(p => p.PostTags)
                                    .ThenInclude(pt => pt.Tag)
                                    .ToList();

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
            Tags = p.PostTags.Select(pt => new TagDTO
            {
                Id = pt.Tag.Id,
                Name = pt.Tag.Name
            }).ToList()
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
                            .Include(p => p.PostTags)
                            .ThenInclude(pt => pt.Tag)
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
            EstimatedReadTime = post.EstimatedReadTime,
            Tags = post.PostTags.Select(pt => new TagDTO
            {
                Id = pt.Tag.Id,
                Name = pt.Tag.Name
            }).ToList()
        };

        return Ok(postDTO);
    }


    [HttpPost]
    [Authorize]
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

        if (post.PostTags != null && post.PostTags.Count > 0)
        {
            var postTags = new List<PostTag>();

            foreach (var postTag in post.PostTags)
            {
                var tagExists = _dbContext.Tags.Any(t => t.Id == postTag.TagId);
                if (!tagExists)
                {
                    return BadRequest($"Tag with ID {postTag.TagId} does not exist.");
                }

                postTags.Add(new PostTag
                {
                    TagId = postTag.TagId,
                    PostId = post.Id
                });
            }

            _dbContext.PostTags.AddRange(postTags);
            _dbContext.SaveChanges();
        }

        return Ok(new { post.Id });
    }


    [HttpPut("{id}")]
    // [Authorize]
    public IActionResult Put(int id, [FromBody] Post updatedPost)
    {
        Post existingPost = _dbContext.Posts.FirstOrDefault(p => p.Id == id);
        if (existingPost == null)
        {
            return NotFound();
        }

        existingPost.Title = updatedPost.Title ?? existingPost.Title;
        existingPost.Body = updatedPost.Body ?? existingPost.Body;
        existingPost.CategoryId = updatedPost.CategoryId;
        existingPost.HeaderImage = updatedPost.HeaderImage ?? existingPost.HeaderImage;
        existingPost.EstimatedReadTime = updatedPost.EstimatedReadTime ?? existingPost.EstimatedReadTime;

        _dbContext.SaveChanges();

        return Ok(existingPost);
    }

    [HttpDelete("{id}")]
    // [Authorize]
    public IActionResult Delete(int id)
    {
        Post existingPost = _dbContext.Posts.FirstOrDefault(p => p.Id == id);
        if (existingPost == null)
        {
            return NotFound();
        }

        _dbContext.Posts.Remove(existingPost);
        _dbContext.SaveChanges();

        return Ok(existingPost);
    }

    [HttpGet("user/{userId}")]
    public IActionResult Get(int userId)
    {
        List<PostDTO> posts = _dbContext.Posts
        .Include(p => p.Author)
        .Include(p => p.Category)
        .Include(p => p.PostTags)
        .ThenInclude(pt => pt.Tag)
        .Where(p => p.AuthorId == userId)
        .OrderByDescending(p => p.PublicationDate)
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
                IsActive = p.Author.IsActive
            },
            PublicationDate = p.PublicationDate,
            Body = p.Body,
            CategoryId = p.CategoryId,
            Category = new CategoryDTO
            {
                Id = p.Category.Id,
                Name = p.Category.Name
            },
            HeaderImage = p.HeaderImage,
            PostApproved = p.PostApproved,
            EstimatedReadTime = p.EstimatedReadTime,
            Tags = p.PostTags.Select(pt => new TagDTO
            {
                Id = pt.Tag.Id,
                Name = pt.Tag.Name
            }).ToList()
        }).ToList();

        return Ok(posts);
    }

    [HttpGet("subscriptions/{userId}")]
    [Authorize]
    public IActionResult GetSubscribedPosts(int userId)
    {
        List<int> subscribedAuthorIds = _dbContext.Subscriptions
                                            .Where(s => s.SubscriberId == userId)
                                            .Select(s => s.AuthorId)
                                            .ToList();

        var posts = _dbContext.Posts
                            .Where(p => subscribedAuthorIds.Contains(p.AuthorId))
                            .Include(p => p.Author)
                            .ThenInclude(up => up.IdentityUser)
                            .Include(p => p.Category)
                            .Include(p => p.PostTags)
                            .ThenInclude(pt => pt.Tag)
                            .OrderByDescending(p => p.PublicationDate)
                            .ToList();

        var postDTOs = posts.Select(p => new PostDTO
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
            Category = new CategoryDTO
            {
                Id = p.Category.Id,
                Name = p.Category.Name
            },
            HeaderImage = p.HeaderImage,
            PostApproved = p.PostApproved,
            EstimatedReadTime = p.EstimatedReadTime,
            Tags = p.PostTags.Select(pt => new TagDTO
            {
                Id = pt.Tag.Id,
                Name = pt.Tag.Name
            }).ToList()
        }).ToList();

        return Ok(postDTOs);
    }
}