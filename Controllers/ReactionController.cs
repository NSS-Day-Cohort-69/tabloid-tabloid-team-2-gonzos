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

    [HttpGet("{postId}")]
    [Authorize]
    public IActionResult GetAPostsReactions(int postId)
    {
        List<ReactionPost> reactionPosts = _dbContext.ReactionPosts
                                              .Where(rp => rp.PostId == postId)
                                              .ToList();

        List<int> reactionIds = reactionPosts
                         .Select(rp => rp.ReactionId)
                         .ToList();

        List<Reaction> reactions = _dbContext.Reactions
                                      .Where(r => reactionIds.Contains(r.Id))
                                      .ToList();

        return Ok(reactions.Select(r => new ReactionDTO
        {
            Id = r.Id,
            Reaction = r.ReactionEmoji,
            Name = r.Name
        }).ToList());
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetAllReactions()
    {
        return (IActionResult)_dbContext.Reactions.Select(r => new ReactionDTO
        {
            Id = r.Id,
            Name = r.Name,
            Reaction = r.ReactionEmoji
        }).ToList();
    }

}