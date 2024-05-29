namespace Tabloid.Models.DTOs
{
    public class ReactionPostDTO
    {
        public int Id { get; set; }
        public int ReactionId { get; set; }
        public int UserProfileId { get; set; }
        public int PostId { get; set; }
    }
}
