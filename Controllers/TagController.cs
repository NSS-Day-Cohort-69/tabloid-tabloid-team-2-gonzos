using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Linq;

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
    [Authorize]
    public IActionResult Get()
    {
        var tags = _dbContext.Tags.OrderBy(t => t.Name).ToList();
        return Ok(tags);
    }
    }