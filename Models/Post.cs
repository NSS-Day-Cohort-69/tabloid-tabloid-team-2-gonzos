using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Tabloid.Utils;

namespace Tabloid.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public int AuthorId { get; set; }
        public UserProfile Author { get; set; }

        [Required]
        public DateTime PublicationDate { get; set; }

        [Required]
        public string Body { get; set; }


        public int? CategoryId { get; set; }
        public Category Category { get; set; }

        public string HeaderImage { get; set; }

        [Required]
        public bool PostApproved { get; set; }

        public int? EstimatedReadTime { 
            get
            {                
                int wordCount=Utilities.CountWords(Body);
                int minutesToRead=Convert.ToInt32(Math.Ceiling((double)wordCount/256));//(~256 Words Per Minute)
                return minutesToRead;
            }
         }

        public List<Comment> Comments { get; set; }
        public List<PostTag> PostTags { get; set; }
        public List<ReactionPost> ReactionPosts { get; set; }
        
    }
}
