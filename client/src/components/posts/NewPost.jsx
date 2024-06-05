import React, { useEffect, useState } from "react";
import { createPost } from "../../managers/postManager";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../managers/categoryManager";
import { getTags } from "../../managers/tagManager";

export const NewPost = ({ loggedInUser }) => {
    // Determine if the logged-in user is an admin
    const isAdmin = loggedInUser.roles.includes("Admin");

    const [postObj, setPostObj] = useState({
        title: "",
        authorId: loggedInUser.id, 
        publicationDate: new Date().toISOString(),
        body: "",
        categoryId: "", 
        headerImage: "",
        postApproved: isAdmin,
        estimatedReadTime: null,
        PostTags: []
    });

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState("");
    const [imgSrc, setImgSrc] = useState("/Images/NewPost.png");

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

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (x) => {
                setImage(imageFile);
                setImgSrc(x.target.result);
            };
            reader.readAsDataURL(imageFile);
            setPostObj({
                ...postObj,
                headerImage: imageFile
            });
        } else {
            setImage("");
            setImgSrc("/Images/emp.png");
        }     
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
                    <label>Upload Header Image:</label>
                    <img style={{ height: 120, width: 100 }} src={imgSrc} className="card-img-top" />   
                    <input type="file" name="headerImage" onChange={handleFileChange} required />
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
