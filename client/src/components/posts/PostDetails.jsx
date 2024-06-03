import { useState, useEffect } from "react";
import { deletePost, getPostById } from "../../managers/postManager";
import { useNavigate, useParams } from "react-router-dom";
import { createComment, deleteComment, getComments } from "../../managers/commentManager.js"
import { Button, Input, Label } from "reactstrap"
import "./PostDetails.css"
import { getTags } from "../../managers/tagManager.js";
import { savePostTags } from "../../managers/postTagManager.js";

export const PostDetails = ({ loggedInUser }) => {
    const [post, setPost] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { id } = useParams();
    const [addCommentSwitch, toggleAddComment] = useState(false);
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([]);
    // Manual Re-render after tags are saved
    const [tagsSaved, setTagsSaved] = useState(false)
    const [deleteConfirmWindow, toggleDeleteConfirmWindow] = useState(0);
    const [commentObj, setCommentObj] = useState(
    {
        Subject: "",
        Content: "",
        PostId: id,
        AuthorId: loggedInUser.id
    });

    const navigate = useNavigate();

    useEffect(() => {
        getPostById(id).then(setPost);
        getTags().then(setTags)
    }, [id, tagsSaved]);

    // Tag UseEffect needed after post is rendered.
    useEffect(() => {
        if (post.tags) {
            setSelectedTags(post.tags.map(tag => tag.id));
        }
    }, [post, tagsSaved])

    // Fetch post data again when tags are saved successfully
    useEffect(() => {
        if (tagsSaved) {
            getPostById(id).then(setPost);
            setTagsSaved(false);
        }
    }, [id, tagsSaved]);

    const handleDelete = () => {
        deletePost(id)
            .then(() => {
                console.log("Post deleted successfully");
                navigate("/posts")
            })
            .catch((error) => {
                console.error("Failed to delete post:", error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCommentObj(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const resetCommentFields = () => {
        setCommentObj({
            Subject: "",
            Content: "",
            PostId: id,
            AuthorId: loggedInUser.id
        });
    };

    // Tag Functions
    const handleSaveTags = async () => {
        try {
            await savePostTags(id, selectedTags).then(setTagsSaved(true));
        } catch (error) {
            console.error("Failed to save tags:", error);
        }
    };
    
    
    const handleTagSelection = (tagId) => {
        const updatedTags = [...selectedTags];
        const index = updatedTags.indexOf(tagId);
        if (index !== -1) {
            updatedTags.splice(index, 1);
        } else {
            updatedTags.push(tagId);
        }
        setSelectedTags(updatedTags);
    };

    return (
        <>
            <h2>Here are your details...</h2>
            <div className="post-main-container">
                <h3>Title: {post.title}</h3>
                <h4>Body: {post.body}</h4>
                {post.headerImage && <img className="post-image-header" src={post.headerImage} alt={`${post.title} header`} />}
                <h6>
                    Publication Date:{" "}
                    {post.publicationDate ? new Date(post.publicationDate).toLocaleDateString("en-US") : "N/A"}
                </h6>
                <p>Username: {post.author?.identityUser?.userName}</p>
                {/* This section pertains to managing the associated tags */}
                <div>
                    <h3>Manage Tags</h3>
                    {tags.map((tag) => (
                        <div key={tag.id}>
                            <Label>
                                <Input
                                    type="checkbox"
                                    checked={selectedTags?.includes(tag.id)}
                                    onChange={() => handleTagSelection(tag.id)}
                                />
                                {tag.name}
                            </Label>
                        </div>
                    ))}
                    <Button onClick={handleSaveTags}>Save Tags</Button>
                </div>
                {/* This section pertains to associating comments with the post */}
                <div className="comments-container">
                    <h3>Comments</h3>
                    <Button
                        color="success"
                        onClick={() => navigate(`/comments/post/${id}`)}
                        >
                            See comments
                    </Button>
                    <Button
                        onClick={() => toggleAddComment(!addCommentSwitch)}>{addCommentSwitch ? "Back" : "Add a comment"}
                    </Button>
                    {addCommentSwitch ?
                    <div>
                        <Label>
                            Subject
                        </Label>
                        <Input
                            name="Subject" 
                            onChange={handleInputChange} 
                            value={commentObj.Subject} />
                        <Label>
                            Content
                        </Label>
                        <Input
                            name="Content" 
                            onChange={handleInputChange} 
                            value={commentObj.Content} />
                        <Button onClick={() => createComment(commentObj).then( () => resetCommentFields() )}>
                            Post Comment
                        </Button>
                    </div> : <div></div>}
                </div>
                {loggedInUser && post.authorId === loggedInUser.id && (
                    <>
                        <div className="options-container">
                            <h3>Options</h3>
                            <Button
                                color="danger"
                                onClick={() => setShowConfirmation(true)}>
                                    Delete
                            </Button>
                            {showConfirmation && (
                                <div>
                                    <p>Are you sure you want to delete this post?</p>
                                    <Button
                                        color="success"
                                        onClick={handleDelete}>
                                            Yes
                                    </Button>
                                    <Button
                                        color="danger"
                                        onClick={() => setShowConfirmation(false)}>
                                            No
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
