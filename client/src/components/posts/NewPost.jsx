import React, { useState } from "react";
import { createPost } from "../../managers/postManager";
import { useNavigate } from "react-router-dom";

export const NewPost = ({ loggedInUser }) => {
    const [postObj, setPostObj] = useState({
        title: "",
        authorId: loggedInUser.id, 
        publicationDate: new Date().toISOString(),
        body: "",
        categoryId: 1, 
        headerImage: "",
        postApproved: false,
        estimatedReadTime: null,
    });

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPostObj({
            ...postObj,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createPost(postObj).then(() => {
            navigate("/posts")
        }).catch((error) => {
            console.error("Error creating post:", error);
        });
    };

    return (
        <>
            <h1>New Post</h1>
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
                <button type="submit">Create Post</button>
            </form>
        </>
    );
};
