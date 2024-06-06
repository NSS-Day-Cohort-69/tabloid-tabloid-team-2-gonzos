import { useEffect, useState } from "react";
import { approvePostById, getApprovedPosts, getPosts, unApproveAPost } from "../../managers/postManager";
import "./ViewPosts.css";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../../managers/categoryManager";
import { getSearchPostByTag } from "../../managers/tagManager.js";
import { Button, Input } from "reactstrap";

export const ViewPosts = ({ loggedInUser }) => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState("")
    const[approvedPost,setApprovedPost]=useState([])
    const navigate = useNavigate();
    const imageUrl = `https://localhost:5001/Uploads/`;

    useEffect(() => {
        // getPosts().then(fetchedPosts => {
        //     const filteredPosts = fetchedPosts
        //         .filter(post => post.postApproved && new Date(post.publicationDate) <= new Date())
        //         .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
        //     setPosts(filteredPosts);
        //     setFilteredPosts(filteredPosts);
        // });
        getPosts().then(fetchedPosts => {
            const filteredPosts = fetchedPosts
                .filter(post=>new Date(post.publicationDate) <= new Date())
                .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
            setPosts(filteredPosts);
            setFilteredPosts(filteredPosts);
        });       

        getAllCategories().then(setCategories);
    }, []);

    useEffect(()=>{
        getApprovedPosts().then((approvedPostList)=>
            {
                const filteredApprovedPosts = approvedPostList
                .filter(post=>new Date(post.publicationDate) <= new Date())
                .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));           
                setApprovedPost(filteredApprovedPosts)
                // setFilteredPosts(filteredApprovedPosts);
            })
    },[])

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

    const handleUnApprove=(id)=>{
        unApproveAPost(id).then(()=>{            
            navigate(`/ViewPosts`)
        })
    }

    const handleApprove=(id)=>{
        approvePostById(id).then(()=>{
            navigate(`/ViewPosts`)
        })
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
            <div className="post-list-container">
                <h2>Welcome to the posts</h2>
                <div className="post-list-options">
                    <div>
                        <label htmlFor="category-select">Filter by category: </label>
                        <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="all">All</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="post-list-search">
                        <label htmlFor="search-input">Search by tag</label>
                        <Input
                            id="search-input"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Enter tag name"
                            />
                    </div>
                </div>            
                {loggedInUser && loggedInUser.roles.includes("Admin") 
                    ?
                    (
                    <div className="post-master-container">
                        {filteredPosts.map(post => (
                        <div className="post" key={post.id}>   
                            <img style={{height: 100}} src={`${imageUrl}${post.headerImage}`} alt={post.title} />
                            <h3>{post.title}</h3>
                            <h5>{post.body}</h5>
                            <h6>Author: <Link className="link" to={`user/${post.authorId}`}>{post.author.firstName + " " + post.author.lastName}</Link></h6>
                            <p>Published on: {new Date(post.publicationDate).toLocaleDateString()}</p>
                            <Button color="info" onClick={() => {
                                navigate(`/posts/${post.id}`);
                            }}>
                                Details
                            </Button>
                            {loggedInUser && post.authorId === loggedInUser.id && (
                                <Button color="success" onClick={() => handleEdit(post.id)}>
                                    Edit
                                </Button>
                            )}                       
                            {
                                post.postApproved
                                ?
                                <Button color="danger" onClick={()=>handleUnApprove(post.id)}>
                                    Un-Approve
                                </Button>
                                :
                                <Button color="success" onClick={()=>handleApprove(post.id)}>
                                    Approve
                                </Button>
                            }                         
                        </div>
                        ))}
                    </div>)
                    :
                    (<div className="post-master-container">
                        {approvedPost.map(post => (
                        <div className="post" key={post.id}>   
                            <img style={{height: 100}} src={`${imageUrl}${post.headerImage}`} alt={post.title} />
                            <h3>{post.title}</h3>
                            <h5>{post.body}</h5>
                            <h6>Author: <Link className="link" to={`user/${post.authorId}`}>{post.author.firstName + " " + post.author.lastName}</Link></h6>
                            <p>Published on: {new Date(post.publicationDate).toLocaleDateString()}</p>
                            <Button onClick={() => {navigate(`/posts/${post.id}`)}}>
                                Details
                            </Button>
                            {loggedInUser && post.authorId === loggedInUser.id && (
                                <Button onClick={() => handleEdit(post.id)}>
                                    Edit
                                </Button>
                            )}                        
                        </div>
                    ))}
                    </div>)
                }
            </div>           
        </>
    );
};
