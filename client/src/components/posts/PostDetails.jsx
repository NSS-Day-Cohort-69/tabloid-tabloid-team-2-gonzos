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
    const [comments, setComments] = useState([])
    const [addCommentSwitch, toggleAddComment] = useState(false)
    const [deleteConfirmWindow, toggleDeleteConfirmWindow] = useState(0)
    const [commentObj, setCommentObj] = useState(
    {
        Subject: "",
        Content: "",
        PostId: id,
        AuthorId: loggedInUser.id
    })
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

    useEffect(() => {
        getComments(id).then(setComments)
    }, [post])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCommentObj(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCommentDeletion = (id) => {
        deleteComment(id).then(() => {
            getComments(post.id).then(setComments)
        toggleDeleteConfirmWindow(0)
        })
    }

    const resetCommentFields = () => {
        commentObj.Content = "";
        commentObj.Subject = "";
    }

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
                <div className="comments-container">
                    <h3>Comments</h3>
                    <Button onClick={() => toggleAddComment(!addCommentSwitch)}>{addCommentSwitch ? "Back" : "Add a comment"}</Button>
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
                        <Button onClick={() => createComment(commentObj).then(() => getComments(post.id).then(setComments).then(() => resetCommentFields()))}>
                            Post Comment
                        </Button>
                    </div> : <div></div>}
                    {comments.map(c => {
                        return(
                            <div className="comment-container" key={c.id}>
                                <p><b>{c.author.firstName} {c.author.lastName}</b> • {c.creationDate ? new Date(c.creationDate).toLocaleDateString('en-US') : 'N/A'}</p>
                                <p>Subject: {c.subject}</p>
                                <p>{c.content}</p>
                                {loggedInUser?.id == c.authorId ? 
                                <div>
                                    <Button
                                        className="comment-option"
                                        color="danger"
                                        onClick={() => toggleDeleteConfirmWindow(c.id)}>
                                        🗑️
                                    </Button>
                                    <Button className="comment-option" color="success">
                                        ✏️
                                    </Button>
                                </div>
                                : <div></div>}
                                {deleteConfirmWindow == c.id ?
                                <div>
                                    <p>Are you sure you want to delete this comment?</p>
                                    <Button
                                        className="comment-option"
                                        color="danger"
                                        onClick={() => toggleDeleteConfirmWindow(0)}>
                                        No
                                    </Button>
                                    <Button
                                        className="comment-option"
                                        color="success"
                                        onClick={() => handleCommentDeletion(c.id)}>
                                        Yes
                                    </Button>
                                </div>
                                :<div></div>}
                            </div>
                        )
                    })}
                </div>
                {loggedInUser && post.authorId === loggedInUser.id && (
                    <>
                        <button onClick={() => setShowConfirmation(true)}>Delete</button>
                        {showConfirmation && (
                            <div>
                                <p>Are you sure you want to delete this post?</p>
                                <button onClick={handleDelete}>Yes</button>
                                <button onClick={() => setShowConfirmation(false)}>No</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};
