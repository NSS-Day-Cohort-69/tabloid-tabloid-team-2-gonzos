import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { deleteComment, getComments } from "../../managers/commentManager.js";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import shrug from "../images/shrug.png"

export const CommentList = ({loggedInUser}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [deleteConfirmWindow, toggleDeleteConfirmWindow] = useState(0);

    useEffect(() => {
        getComments(id).then(setComments)
    }, [id]);

    const handleCommentDeletion = (commentId) => {
        deleteComment(commentId).then(() => {
            getComments(id).then(setComments)
        toggleDeleteConfirmWindow(0)
        })
    };

    
    return(
        <div className="comments-container">
            {comments.length < 1 ?
            <div className="comments-container-empty">
                No comments made yet...
                <img src={shrug} alt="shrug" width="200" />
            </div> : 
            
            comments.map(c => {
                        return(
                            <div className="comment-container" key={c.id}>
                                <p><b>{c.author.firstName} {c.author.lastName}</b> • {c.creationDate ? new Date(c.creationDate).toLocaleDateString('en-US') : 'N/A'}</p>
                                <p>Subject: {c.subject}</p>
                                <p>{c.content}</p>
                                {
                                    (loggedInUser?.id === c.authorId || loggedInUser?.roles.some(role => role === "Admin")) ? 
                                        <div>
                                            <Button
                                                className="comment-option"
                                                color="danger"
                                                onClick={() => toggleDeleteConfirmWindow(c.id)}>
                                                🗑️
                                            </Button>
                                            {loggedInUser?.id === c.authorId && (
                                                <Button
                                                    className="comment-option"
                                                    color="success"
                                                    onClick={() => navigate(`/posts/editComment/${c.id}`)}>
                                                    ✏️
                                                </Button>
                                            )}
                                        </div>
                                    : <div></div>
                                }
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
                    })
                    }
                <Button className="back-btn" onClick={() => {
                    navigate(`/posts/${id}`)}}>
                    Back
                </Button>
        </div>
    )
}