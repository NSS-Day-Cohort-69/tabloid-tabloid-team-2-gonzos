using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Demotion
    {
        public int Id { get; set; }

        [Required]
        public int AdminId { get; set; }
        public UserProfile Admin { get; set; }

        [Required]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
