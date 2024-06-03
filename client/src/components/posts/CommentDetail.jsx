import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getCommentById } from "../../managers/commentManager.js";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const CommentDetail = ({loggedInUser}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [comment, setComment] = useState({});

    useEffect(() => {
        getCommentById(id).then(setComment)
    }, [id])

    return(
        <div>
            <div>
                <h3>Subject: {comment.subject}</h3>
                <p>{loggedInUser.userName} • {comment.creationDate ? new Date(comment.creationDate).toLocaleDateString('en-US') : 'N/A'}</p>
                <p>{comment.content}</p>
            </div>
            <Button
                color="success"
                onClick={() => navigate(`/posts/${comment.postId}`)}>
                Back to Post
            </Button>
        </div>
    )
}