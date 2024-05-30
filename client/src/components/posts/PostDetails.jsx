import { useEffect, useState } from "react"
import { getPostById } from "../../managers/postManager"
import { useParams } from "react-router-dom"
import { createComment, getComments } from "../../managers/commentManager.js"
import { Button, Input, Label } from "reactstrap"

export const PostDetails = ({loggedInUser}) => {
    const [post, setPost] = useState({})
    const { id } = useParams();
    const [comments, setComments] = useState([])
    const [addCommentSwitch, toggleAddComment] = useState(false)
    const [commentObj, setCommentObj] = useState(
    {
        Subject: "",
        Content: "",
        PostId: id,
        AuthorId: loggedInUser.id
    })

    useEffect(() => {
        getPostById(id).then(setPost)
    }, [])

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

    const resetCommentFields = () => {
        commentObj.Content = "";
        commentObj.Subject = "";
    }

    return (
        <>
            <h2>Here are yur details...</h2>
            <div className="post-main-container">
                <h3>Title: {post.title}</h3>
                <h4>Body: {post.body}</h4>
                <h5>Header Img: {post.headerImage}</h5>
                <h6>
                Publication Date: 
                {post.publicationDate ? new Date(post.publicationDate).toLocaleDateString('en-US') : 'N/A'}
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
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}