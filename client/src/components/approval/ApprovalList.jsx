import { useEffect, useState } from "react";
import { approvePostById, getUnapprovedPosts } from "../../managers/postManager";
import "./Approval.css"
import { Button } from "reactstrap";

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
            <div className="approval-container">
                <h2>Waiting for Approval</h2>
                { postsNeedingApproval.count < 1 ?
                <div>
                    <h5>No posts waiting for approval!</h5>
                </div>
                : postsNeedingApproval.map(post => (
                    <div className="post" key={post.id}>
                        <h3>Title: {post.title}</h3>
                        <h5>Body: {post.body}</h5>
                        <p>Author: {post.author.firstName + " " + post.author.lastName}</p>
                        <Button color="success" onClick={() => approvePost(post.id)}>Approve Post</Button>
                    </div>
                ))}
            </div>
        </>
    );
};
