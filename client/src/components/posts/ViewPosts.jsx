import { useEffect, useState } from "react";
import { getPosts } from "../../managers/postManager";
import "./ViewPosts.css";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../../managers/categoryManager";
import { getSearchPostByTag } from "../../managers/tagManager.js";

export const ViewPosts = ({ loggedInUser }) => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState("")
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
        applyFilters(category, searchTerm);
    };

    const handleSearchChange = (event) =>{
        const term = event.target.value;
        setSearchTerm(term);
        applyFilters(selectedCategory, term);
    }

    const applyFilters = (category, term) => {
        let filtered = posts;

        if (category !== 'all')
        {
            filtered = filtered.filter(post => post.categoryId === parseInt(category));
        }

        if(term)
        {
           getSearchPostByTag(term).then(fetchedPosts =>{
            const postIds = fetchedPosts.map(post => post.id);
            filtered = filtered.filter(post => postIds.includes(post.id));
            setFilteredPosts(filtered);
           });
        }
        else
        {
            setFilteredPosts(filtered);
        }
    };



    const displayedPosts = searchTerm ? filteredPosts : filteredPosts;

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
            <div>
                <label htmlFor="search-input">Search by tag</label>
                <input
                    id="search-input"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter tag name"
                    />
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
