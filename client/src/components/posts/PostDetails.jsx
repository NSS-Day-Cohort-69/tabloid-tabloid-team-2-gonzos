import { useState, useEffect } from "react";
import { deletePost, getPostById } from "../../managers/postManager";
import { useNavigate, useParams } from "react-router-dom";
import { createComment, deleteComment, getComments } from "../../managers/commentManager.js"
import { Button, Input, Label } from "reactstrap"
import "./PostDetails.css"

export const PostDetails = ({ loggedInUser }) => {
    const [post, setPost] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { id } = useParams();
    const [addCommentSwitch, toggleAddComment] = useState(false);
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
    }, [id]);

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


    return (
        <>
            <div className="post-container">
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
            </div>
            <div className="comments-container">
                <h3>Comments</h3>
                <Button
                    color="info"
                    onClick={() => navigate(`/comments/post/${id}`)}>
                    See Comments
                </Button>
                <Button
                    color="success"
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
