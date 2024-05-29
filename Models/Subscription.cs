using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Subscription
    {
        public int Id { get; set; }

        [Required]
        public int SubscriberId { get; set; }
        public UserProfile Subscriber { get; set; }

        [Required]
        public int AuthorId { get; set; }
        public UserProfile Author { get; set; }
    }
}
