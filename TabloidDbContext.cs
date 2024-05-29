using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Tabloid.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;


namespace Tabloid.Data
{
    public class TabloidDbContext : IdentityDbContext<IdentityUser>
    {
        private readonly IConfiguration _configuration;

        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<PostTag> PostTags { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Reaction> Reactions { get; set; }
        public DbSet<ReactionPost> ReactionPosts { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<Demotion> Demotions { get; set; }

        public TabloidDbContext(DbContextOptions<TabloidDbContext> context, IConfiguration config) : base(context)
        {
            _configuration = config;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                Name = "Admin",
                NormalizedName = "admin"
            });

            modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser[]
            {
                new IdentityUser
                {
                    Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                    UserName = "Administrator",
                    Email = "admina@strator.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
                new IdentityUser
                {
                    Id = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                    UserName = "JohnDoe",
                    Email = "john@doe.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
                new IdentityUser
                {
                    Id = "a7d21fac-3b21-454a-a747-075f072d0cf3",
                    UserName = "JaneSmith",
                    Email = "jane@smith.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
                new IdentityUser
                {
                    Id = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                    UserName = "AliceJohnson",
                    Email = "alice@johnson.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
                new IdentityUser
                {
                    Id = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                    UserName = "BobWilliams",
                    Email = "bob@williams.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
                new IdentityUser
                {
                    Id = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                    UserName = "EveDavis",
                    Email = "Eve@Davis.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
            });

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>[]
            {
                new IdentityUserRole<string>
                {
                    RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                    UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                    UserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df"
                },
            });

            modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
            {
                new UserProfile
                {
                    Id = 1,
                    IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                    FirstName = "Admina",
                    LastName = "Strator",
                    ImageLocation = "https://robohash.org/numquamutut.png?size=150x150&set=set1",
                    CreateDateTime = new DateTime(2022, 1, 25),
                    IsActive = true
                },
                new UserProfile
                {
                    Id = 2,
                    FirstName = "John",
                    LastName = "Doe",
                    CreateDateTime = new DateTime(2023, 2, 2),
                    ImageLocation = "https://robohash.org/nisiautemet.png?size=150x150&set=set1",
                    IdentityUserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                    IsActive = true
                },
                new UserProfile
                {
                    Id = 3,
                    FirstName = "Jane",
                    LastName = "Smith",
                    CreateDateTime = new DateTime(2022, 3, 15),
                    ImageLocation = "https://robohash.org/molestiaemagnamet.png?size=150x150&set=set1",
                    IdentityUserId = "a7d21fac-3b21-454a-a747-075f072d0cf3",
                    IsActive = true
                },
                new UserProfile
                {
                    Id = 4,
                    FirstName = "Alice",
                    LastName = "Johnson",
                    CreateDateTime = new DateTime(2023, 6, 10),
                    ImageLocation = "https://robohash.org/deseruntutipsum.png?size=150x150&set=set1",
                    IdentityUserId = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                    IsActive = true
                },
                new UserProfile
                {
                    Id = 5,
                    FirstName = "Bob",
                    LastName = "Williams",
                    CreateDateTime = new DateTime(2023, 5, 15),
                    ImageLocation = "https://robohash.org/quiundedignissimos.png?size=150x150&set=set1",
                    IdentityUserId = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                    IsActive = true
                },
                new UserProfile
                {
                    Id = 6,
                    FirstName = "Eve",
                    LastName = "Davis",
                    CreateDateTime = new DateTime(2022, 10, 18),
                    ImageLocation = "https://robohash.org/hicnihilipsa.png?size=150x150&set=set1",
                    IdentityUserId = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                    IsActive = true
                }
            });

            // // Seed data for other models
            // modelBuilder.Entity<UserProfile>().HasData(
            //     new UserProfile { Id = 1, FirstName = "Alice", LastName = "Smith", UserName = "alice_s", Email = "alice@example.com", CreateDateTime = DateTime.Now, IdentityUserId = "1", IsActive = true },
            //     new UserProfile { Id = 2, FirstName = "Bob", LastName = "Johnson", UserName = "bob_j", Email = "bob@example.com", CreateDateTime = DateTime.Now, IdentityUserId = "2", IsActive = true },
            //     new UserProfile { Id = 3, FirstName = "Charlie", LastName = "Brown", UserName = "charlie_b", Email = "charlie@example.com", CreateDateTime = DateTime.Now, IdentityUserId = "3", IsActive = true },
            //     new UserProfile { Id = 4, FirstName = "David", LastName = "Williams", UserName = "david_w", Email = "david@example.com", CreateDateTime = DateTime.Now, IdentityUserId = "4", IsActive = true },
            //     new UserProfile { Id = 5, FirstName = "Eve", LastName = "Davis", UserName = "eve_d", Email = "eve@example.com", CreateDateTime = DateTime.Now, IdentityUserId = "5", IsActive = true }
            // );

            modelBuilder.Entity<Tag>().HasData(
                new Tag { Id = 1, Name = "Technology" },
                new Tag { Id = 2, Name = "Science" },
                new Tag { Id = 3, Name = "Health" },
                new Tag { Id = 4, Name = "Sports" },
                new Tag { Id = 5, Name = "Education" },
                new Tag { Id = 6, Name = "Travel" },
                new Tag { Id = 7, Name = "Lifestyle" },
                new Tag { Id = 8, Name = "Finance" },
                new Tag { Id = 9, Name = "Food" },
                new Tag { Id = 10, Name = "Entertainment" }
            );

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "News" },
                new Category { Id = 2, Name = "Blog" },
                new Category { Id = 3, Name = "Tutorial" },
                new Category { Id = 4, Name = "Review" },
                new Category { Id = 5, Name = "Opinion" }
            );

            modelBuilder.Entity<Post>().HasData(
                new Post { Id = 1, Title = "First Post", AuthorId = 1, PublicationDate = DateTime.Now, Body = "This is the first post body.", CategoryId = 1, PostApproved = true },
                new Post { Id = 2, Title = "Second Post", AuthorId = 2, PublicationDate = DateTime.Now, Body = "This is the second post body.", CategoryId = 2, PostApproved = true },
                new Post { Id = 3, Title = "Third Post", AuthorId = 3, PublicationDate = DateTime.Now, Body = "This is the third post body.", CategoryId = 3, PostApproved = true }
            );

            modelBuilder.Entity<Comment>().HasData(
                new Comment { Id = 1, AuthorId = 1, PostId = 1, CreationDate = DateTime.Now, Subject = "Great Post!", Content = "Really enjoyed reading this." },
                new Comment { Id = 2, AuthorId = 2, PostId = 1, CreationDate = DateTime.Now, Subject = "Interesting", Content = "Thanks for sharing." },
                new Comment { Id = 3, AuthorId = 3, PostId = 2, CreationDate = DateTime.Now, Subject = "Informative", Content = "Learned something new today." },
                new Comment { Id = 4, AuthorId = 4, PostId = 2, CreationDate = DateTime.Now, Subject = "Good Read", Content = "Keep up the good work." },
                new Comment { Id = 5, AuthorId = 5, PostId = 3, CreationDate = DateTime.Now, Subject = "Well Written", Content = "Well articulated points." },
                new Comment { Id = 6, AuthorId = 1, PostId = 3, CreationDate = DateTime.Now, Subject = "Enjoyable", Content = "Really enjoyed this post." }
            );

            modelBuilder.Entity<Subscription>().HasData(
                new Subscription { Id = 1, SubscriberId = 1, AuthorId = 2 },
                new Subscription { Id = 2, SubscriberId = 2, AuthorId = 3 },
                new Subscription { Id = 3, SubscriberId = 3, AuthorId = 4 },
                new Subscription { Id = 4, SubscriberId = 4, AuthorId = 5 },
                new Subscription { Id = 5, SubscriberId = 5, AuthorId = 1 }
            );

            modelBuilder.Entity<Reaction>().HasData(
                new Reaction { Id = 1, Name = "Like", ReactionEmoji = "👍" },
                new Reaction { Id = 2, Name = "Love", ReactionEmoji = "❤️" },
                new Reaction { Id = 3, Name = "Haha", ReactionEmoji = "😂" },
                new Reaction { Id = 4, Name = "Wow", ReactionEmoji = "😮" },
                new Reaction { Id = 5, Name = "Sad", ReactionEmoji = "😢" }
            );

            modelBuilder.Entity<ReactionPost>().HasData(
                new ReactionPost { Id = 1, ReactionId = 1, UserProfileId = 1, PostId = 1 },
                new ReactionPost { Id = 2, ReactionId = 2, UserProfileId = 2, PostId = 2 },
                new ReactionPost { Id = 3, ReactionId = 3, UserProfileId = 3, PostId = 3 },
                new ReactionPost { Id = 4, ReactionId = 4, UserProfileId = 4, PostId = 1 },
                new ReactionPost { Id = 5, ReactionId = 5, UserProfileId = 5, PostId = 2 }
            );

            modelBuilder.Entity<PostTag>().HasData(
                new PostTag { Id = 1, PostId = 1, TagId = 1 },
                new PostTag { Id = 2, PostId = 1, TagId = 2 },
                new PostTag { Id = 3, PostId = 2, TagId = 3 },
                new PostTag { Id = 4, PostId = 2, TagId = 4 },
                new PostTag { Id = 5, PostId = 3, TagId = 5 }
            );

            modelBuilder.Entity<Demotion>().HasData(
                new Demotion { Id = 1, AdminId = 1, UserProfileId = 2 }
            );
            modelBuilder.Entity<Demotion>()
                .HasOne(d => d.Admin)
                .WithMany(up => up.AdminDemotions)
                .HasForeignKey(d => d.AdminId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Demotion>()
                .HasOne(d => d.UserProfile)
                .WithMany(up => up.UserProfileDemotions)
                .HasForeignKey(d => d.UserProfileId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Author)
                .WithMany(up => up.Comments)
                .HasForeignKey(c => c.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Post>()
                .HasOne(p => p.Author)
                .WithMany(up => up.Posts)
                .HasForeignKey(p => p.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Post>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Posts)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PostTag>()
                .HasOne(pt => pt.Post)
                .WithMany(p => p.PostTags)
                .HasForeignKey(pt => pt.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PostTag>()
                .HasOne(pt => pt.Tag)
                .WithMany(t => t.PostTags)
                .HasForeignKey(pt => pt.TagId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ReactionPost>()
                .HasOne(rp => rp.Post)
                .WithMany(p => p.ReactionPosts)
                .HasForeignKey(rp => rp.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ReactionPost>()
                .HasOne(rp => rp.Reaction)
                .WithMany(r => r.ReactionPosts)
                .HasForeignKey(rp => rp.ReactionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ReactionPost>()
                .HasOne(rp => rp.UserProfile)
                .WithMany(up => up.ReactionPosts)
                .HasForeignKey(rp => rp.UserProfileId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.Subscriber)
                .WithMany(up => up.Subscriptions)
                .HasForeignKey(s => s.SubscriberId)
                .OnDelete(DeleteBehavior.Restrict);

            // modelBuilder.Entity<Subscription>()
            //     .HasOne(s => s.Author)
            //     .WithMany(up => up.Subscriptions)
            //     .HasForeignKey(s => s.AuthorId)
            //     .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
