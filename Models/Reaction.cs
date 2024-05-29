using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Reaction
    {
        public int Id { get; set; }

        [Required]
        public string ReactionEmoji { get; set; }

        [Required]
        public string Name { get; set; }

        public List<ReactionPost> ReactionPosts { get; set; }
    }
}
