import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getPostsByUserId } from "../../managers/postManager.js";

export const MyPosts = () => {
    const {id} = useParams();
    const [posts, setPosts] = useState([])
    const imageUrl = `https://localhost:5001/Uploads/`;

    useEffect(() => {
        getPostsByUserId(id).then(setPosts)
    }, [id])

    return(
        <div>
            <div>
                {posts.map(p => (
                    <div className="post" key={p.id}>
                        <img style={{height: 100}} src={`${imageUrl}${p.headerImage}`} alt={p.title} />
                        <h3>Title: {p.title}</h3>
                        <h5>Body: {p.body}</h5>
                        <h6>Author: {p.author.firstName + " " + p.author.lastName}</h6>
                        <p>Published on: {new Date(p.publicationDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}