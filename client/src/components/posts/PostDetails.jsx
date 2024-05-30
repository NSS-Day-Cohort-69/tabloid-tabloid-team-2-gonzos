import { useState, useEffect } from "react";
import { deletePost, getPostById } from "../../managers/postManager";
import { useNavigate, useParams } from "react-router-dom";

export const PostDetails = ({ loggedInUser }) => {
    const [post, setPost] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { id } = useParams();
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

    return (
        <>
            <h2>Here are your details...</h2>
            <div className="post-main-container">
                <h3>Title: {post.title}</h3>
                <h4>Body: {post.body}</h4>
                <h5>Header Img: {post.headerImage}</h5>
                <h6>
                    Publication Date:{" "}
                    {post.publicationDate ? new Date(post.publicationDate).toLocaleDateString("en-US") : "N/A"}
                </h6>
                <p>Username: {post.author?.identityUser?.userName}</p>
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
