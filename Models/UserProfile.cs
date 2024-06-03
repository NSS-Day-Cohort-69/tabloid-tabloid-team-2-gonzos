using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Tabloid.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        // [Required]
        public string UserName { get; set; }

        // [Required]
        public string Email { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }
        public string FormattedDateTime
        {
            get { return CreateDateTime.Date.ToString("MM - dd - yyyy"); }
        }
        public string ImageLocation { get; set; }

        [Required]
        public string IdentityUserId { get; set; }
        public IdentityUser IdentityUser { get; set; }

        [Required]
        public bool IsActive { get; set; }
        
        public List<string> Roles { get; set; }
        public List<Post> Posts { get; set; }

        public List<Comment> Comments { get; set; }
        public List<Subscription> Subscriptions { get; set; }
        [NotMapped]
        public List<Demotion>? AdminDemotions { get; set; }  // Changed from Demotions to AdminDemotions
        [NotMapped]
        public List<Demotion>? UserProfileDemotions { get; set; } // Added UserProfileDemotions
        public List<ReactionPost> ReactionPosts { get; set; }
        public string FullName
            {
                get
                {
                    return $"{FirstName} {LastName}";
                }
            }
    }
}


