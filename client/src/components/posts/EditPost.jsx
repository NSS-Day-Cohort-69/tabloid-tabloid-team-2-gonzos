import React, { useState, useEffect } from "react";
import { updatePost, getPostById } from "../../managers/postManager";
import { useNavigate, useParams } from "react-router-dom";

export const EditPost = () => {
    const [postObj, setPostObj] = useState({
        title: "",
        body: "",
        headerImage: "",
        categoryId: 1, 
        estimatedReadTime: null,
    });

    const { id } = useParams()

    const navigate = useNavigate();

    useEffect(() => {
        getPostById(id).then((post) => {
            setPostObj({
                title: post.title,
                body: post.body,
                headerImage: post.headerImage,
                categoryId: post.categoryId,
                estimatedReadTime: post.estimatedReadTime,
            });
        }).catch((error) => {
            console.error("Error fetching post:", error);
        });
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPostObj({
            ...postObj,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updatePost(id, postObj).then(() => {
            navigate(`/posts/${id}`);
        }).catch((error) => {
            console.error("Error updating post:", error);
        });
    };

    return (
        <>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={postObj.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea
                        name="body"
                        value={postObj.body}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Header Image URL:</label>
                    <input
                        type="text"
                        name="headerImage"
                        value={postObj.headerImage}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Category ID:</label>
                    <input
                        type="number"
                        name="categoryId"
                        value={postObj.categoryId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Estimated Read Time (minutes):</label>
                    <input
                        type="number"
                        name="estimatedReadTime"
                        value={postObj.estimatedReadTime}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Update Post</button>
            </form>
            <button onClick={() => {
                navigate("/posts")
            }}>Cancel Edit</button>
        </>
    );
};
