import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { editCommentPUT, getCommentById } from "../../managers/commentManager.js";
import { Button, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const EditComment = ({loggedInUser}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [comment, setComment] = useState({})
    
    useEffect(() => {
        getCommentById(id).then(setComment)
    }, [id])

    const handleSaveChanges = (event) => {
        event.preventDefault();
        editCommentPUT(comment).then(() => {
            navigate(`/comments/detail/${comment.id}`)
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setComment((prevComment) => ({
            ...prevComment,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={(event) => handleSaveChanges(event)}>
            <fieldset>
                <label>
                    Subject
                </label>
                <Input
                    name="subject"
                    value={comment.subject || ""}
                    onChange={handleChange}
                    required
                />
            </fieldset>
            <fieldset>
                <label>
                    Content
                </label>
                <Input
                    name="content"
                    value={comment.content || ""}
                    onChange={handleChange}
                    required
                />
            </fieldset>
            <div>
                <Button
                    color="danger"
                    onClick={() => navigate(`/posts/${comment.postId}`)}>
                    Cancel
                </Button>
                <Button
                    color="success"
                    type="submit"
                >
                    Save Changes
                </Button>
            </div>
        </form>
    );
}