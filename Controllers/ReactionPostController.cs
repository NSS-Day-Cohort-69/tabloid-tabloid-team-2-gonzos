using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Microsoft.EntityFrameworkCore;
using Tabloid.Models;
using Tabloid.Models.DTOs;

[ApiController]
[Route("api/[controller]")]
public class ReactionPostController:ControllerBase
{
    private TabloidDbContext _dbContext;

    public ReactionPostController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet("{postId}")]
    [Authorize]
    public IActionResult GetReactionPost(int postId)
    {
        List<ReactionPost> reactionPosts = _dbContext.ReactionPosts.Where(rP => rP.PostId == postId).ToList();
        return Ok(reactionPosts.Select(rP => new ReactionPostDTO
        {
            Id = rP.Id,
            ReactionId = rP.ReactionId,
            UserProfileId = rP.UserProfileId,
            PostId = rP.PostId
        }));

    }

    [HttpPost]
    [Authorize]
    public IActionResult CreateReactionPost(ReactionPost reactionPost)
    {
        if (reactionPost.ReactionId == 0 || reactionPost.UserProfileId == 0 || reactionPost.PostId == 0)
        {
            return BadRequest();
        }

        _dbContext.ReactionPosts.Add(reactionPost);
        _dbContext.SaveChanges();
        return Ok(reactionPost);
    }
    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeleteReactionPost(int id)
    {
        ReactionPost reactionPostToDelete = _dbContext.ReactionPosts.FirstOrDefault(rP => rP.Id == id);
        
        if (reactionPostToDelete == null)
        {
            return BadRequest();
        }

        _dbContext.ReactionPosts.Remove(reactionPostToDelete);
        _dbContext.SaveChanges();
        return Ok();
    }
}