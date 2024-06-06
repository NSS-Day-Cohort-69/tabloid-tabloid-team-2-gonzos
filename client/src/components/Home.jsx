import { useEffect, useState } from "react"
import { getUserSubscribedPosts } from "../managers/postManager"
import "./Home.css"

export const Home = ({ loggedInUser }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getUserSubscribedPosts(loggedInUser.id).then(setPosts)
    }, [loggedInUser])

    return (
        <>
            <div className="home-container">
                <h2>Welcome to the Tabloid!</h2>
                {posts.length > 0 ? (
                    <div>
                        <h3>Your Subscribed Posts</h3>
                        <ul className="post-master-container plain-list">
                            {posts.map(post => (
                                <li className="post" key={post.id}>
                                    <h4>{post.title}</h4>
                                    <p>By: {post.author.firstName} {post.author.lastName}</p>
                                    <p>{post.body}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>You have no subscribed posts yet.</p>
                )}
            </div>
        </>
    )
}