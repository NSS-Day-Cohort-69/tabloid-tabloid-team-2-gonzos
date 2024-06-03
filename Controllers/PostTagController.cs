using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;

[ApiController]
[Route("api/[controller]")]
public class PostTagController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public PostTagController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost("{postId}/tags")]
    // [Authorize]
    public IActionResult SavePostTags(int postId, [FromBody] List<int> tagIds)
    {

        var post = _dbContext.Posts.FirstOrDefault(p => p.Id == postId);
        if (post == null)
        {
            return NotFound();
        }

        var existingPostTags = _dbContext.PostTags.Where(pt => pt.PostId == postId).ToList();
        _dbContext.PostTags.RemoveRange(existingPostTags);

        foreach (var tagId in tagIds)
        {
            var postTag = new PostTag
            {
                PostId = postId,
                TagId = tagId
            };
            _dbContext.PostTags.Add(postTag);
        }

        _dbContext.SaveChanges();

        return Ok();
    }
}