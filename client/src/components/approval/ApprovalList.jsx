import { useEffect, useState } from "react";
import { approvePostById, getUnapprovedPosts } from "../../managers/postManager";

export const ApprovalList = () => {
    const [postsNeedingApproval, setPostsNeedingApproval] = useState([]);
    const [render, setRender] = useState(false);

    useEffect(() => {
        getUnapprovedPosts().then(setPostsNeedingApproval);
    }, [render]);

    const approvePost = (postId) => {
        approvePostById(postId).then(() => {
            setRender((prevRender) => !prevRender);
        });
    };

    return (
        <>
            <h2>Waiting for Approval:</h2>
            {postsNeedingApproval.map(post => (
                <div className="post" key={post.id}>
                    <h3>Title: {post.title}</h3>
                    <h5>Body: {post.body}</h5>
                    <p>Author: {post.author.firstName + " " + post.author.lastName}</p>
                    <button onClick={() => approvePost(post.id)}>Approve Post</button>
                </div>
            ))}
        </>
    );
};
