import { useEffect, useState } from "react";
import { getPosts } from "../../managers/postManager";
import "./ViewPosts.css";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../managers/categoryManager";
import { getSearchPostByTag } from "../../managers/tagManager.js";

export const ViewPosts = ({ loggedInUser }) => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

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

    const handleSearchChange = (event) =>{
        const term = event.target.value;
        setSearchTerm(term);
        applySearchFilter(term);
    }

    const applyCategoryFilter = (category) => {
        if (category === 'all')
        {
            setFilteredPosts(posts);
        }
        else
        {
            setFilteredPosts(posts.filter(post => post.categoryId === parseInt(category)));
        }
    };

    const applySearchFilter = (term) => {
        if (term)
            {
                getSearchPostByTag(term).then(fetchedPosts => 
                    {
                        setSearchResults(fetchedPosts);
                    }
                )
            }
            else
            {
                setSearchResults([]);
            }
    }

    const displayedPosts = searchTerm ? searchResults : filteredPosts;

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
                {displayedPosts.map(post => (
                    <div className="post" key={post.id}>
                        <h3>Title: {post.title}</h3>
                        <h5>Body: {post.body}</h5>
                        <h6>Author: {post.author.firstName + " " + post.author.lastName}</h6>
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
