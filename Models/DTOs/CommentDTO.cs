namespace Tabloid.Models.DTOs
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public UserProfileDTO Author { get; set; }
        public int PostId { get; set; }
        public DateTime CreationDate { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
    }
}
