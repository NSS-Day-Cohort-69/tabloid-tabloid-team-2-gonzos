import { useEffect, useState } from "react"
import { getPostById } from "../../managers/postManager"
import { useParams } from "react-router-dom"

export const PostDetails = () => {
    const [post, setPost] = useState({})
    const { id } = useParams();

    useEffect(() => {
        getPostById(id).then(setPost)
    }, [])

    return (
        <>
            <h2>Here are yur details...</h2>
            <div className="post-main-container">
                <h3>Title: {post.title}</h3>
                <h4>Body: {post.body}</h4>
                <h5>Header Img: {post.headerImage}</h5>
                <h6>Publication Date: {post.publicationDate}</h6>
                <p>Username: {post.author?.identityUser.userName}</p>
            </div>
        </>
    )
}