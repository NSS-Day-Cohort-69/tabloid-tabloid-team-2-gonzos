using System;
using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public int AuthorId { get; set; }
        public UserProfile Author { get; set; }

        [Required]
        public int PostId { get; set; }
        public Post Post { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
