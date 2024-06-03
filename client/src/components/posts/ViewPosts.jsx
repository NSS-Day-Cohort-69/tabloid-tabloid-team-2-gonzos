import { useEffect, useState } from "react";
import { getPosts } from "../../managers/postManager";
import "./ViewPosts.css";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../../managers/categoryManager";

export const ViewPosts = ({ loggedInUser }) => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const navigate = useNavigate();
    const imageUrl = `https://localhost:5001/Uploads/`;

    useEffect(() => {
        getPosts().then(fetchedPosts => {
            const filteredPosts = fetchedPosts
                .filter(post => post.postApproved && new Date(post.publicationDate) <= new Date())
                .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
            setPosts(filteredPosts);
            setFilteredPosts(filteredPosts);
        });

        getAllCategories().then(setCategories);
    }, []);

    const handleEdit = (postId) => {
        navigate(`/posts/edit/${postId}`);
    };

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        
        if (category === 'all') {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter(post => post.categoryId === parseInt(category)));
        }
    };

    return (
        <>
            <h2>Welcome to the posts</h2>
            <div>
                <label htmlFor="category-select">Filter by category: </label>
                <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="all">All</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="post-master-container">
                {filteredPosts.map(post => (
                    <div className="post" key={post.id}>   
                        <img style={{height: 100}} src={`${imageUrl}${post.headerImage}`} alt={post.title} />
                        <h3>Title: {post.title}</h3>
                        <h5>Body: {post.body}</h5>
                        <h6><Link className="link" to={`user/${post.authorId}`}>Author: {post.author.firstName + " " + post.author.lastName}</Link></h6>
                        <p>Published on: {new Date(post.publicationDate).toLocaleDateString()}</p>
                        <button onClick={() => {
                            navigate(`/posts/${post.id}`);
                        }}>Details</button>
                        {loggedInUser && post.authorId === loggedInUser.id && (
                            <button onClick={() => handleEdit(post.id)}>Edit</button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};
