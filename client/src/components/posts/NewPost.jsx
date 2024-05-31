import React, { useEffect, useState } from "react";
import { createPost } from "../../managers/postManager";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../managers/categoryManager";
import { getTags } from "../../managers/tagManager";

export const NewPost = ({ loggedInUser }) => {
    const [postObj, setPostObj] = useState({
        title: "",
        authorId: loggedInUser.id, 
        publicationDate: new Date().toISOString(),
        body: "",
        categoryId: "", 
        headerImage: "",
        postApproved: true,
        estimatedReadTime: null,
        PostTags: []
    });

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getAllCategories().then(setCategories);
        getTags().then(setTags);
    }, []);

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPostObj({
            ...postObj,
            [name]: value,
        });
    };

    const handleCategoryChange = (event) => {
        setPostObj({
            ...postObj,
            categoryId: parseInt(event.target.value),
        });
    };

    const handleTagChange = (event) => {
        const selectedTags = Array.from(event.target.selectedOptions, option => ({ tagId: parseInt(option.value) }));
        setPostObj({
            ...postObj,
            PostTags: selectedTags
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createPost(postObj).then((newPostId) => {
            navigate(`/posts/${newPostId}`);
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
                    <label>Category:</label>
                    <select
                        name="categoryId"
                        value={postObj.categoryId}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Tags:</label>
                    <select
                        multiple
                        name="tagIds"
                        value={postObj.PostTags.map(tag => tag.tagId)}
                        onChange={handleTagChange}
                    >
                        {tags.map(tag => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
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
