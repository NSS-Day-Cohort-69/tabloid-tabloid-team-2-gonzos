namespace Tabloid.Models.DTOs
{
    public class PostDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public UserProfileDTO Author {get; set;}
        public DateTime PublicationDate { get; set; }
        public string Body { get; set; }
        public int CategoryId { get; set; }
        public CategoryDTO Category { get; set; }
        public string HeaderImage { get; set; }
        public bool PostApproved { get; set; }
        public int? EstimatedReadTime { get; set; }

        public List<TagDTO> Tags {get; set;} 
    }
}
