import { useEffect, useState } from "react"
import { getPosts } from "../../managers/postManager"
import "./ViewPosts.css"

export const ViewPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts().then(fetchedPosts => {
            const filteredPosts = fetchedPosts
                .filter(post => post.postApproved && new Date(post.publicationDate) <= new Date())
                .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
            setPosts(filteredPosts)
        })
    }, [])

    return (
        <>
            <h2>Welcome to the posts</h2>
            <div className="post-master-container">
                {posts.map(post => (
                    <div className="post" key={post.id}>
                        <h3>Title: {post.title}</h3>
                        <h5>Body: {post.body}</h5>
                        <h6>Author: {post.author.firstName + " " + post.author.lastName}</h6>
                        <p>Published on: {new Date(post.publicationDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
