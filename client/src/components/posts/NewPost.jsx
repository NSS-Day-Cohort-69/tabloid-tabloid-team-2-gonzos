import React, { useEffect, useState } from "react";
import { createPost } from "../../managers/postManager";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../managers/categoryManager";
import { getTags } from "../../managers/tagManager";
import { Button, Input, Dropdown, FormText } from "reactstrap";
import "./NewPost.css";

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
        estimatedReadTime: 0,
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
        const { value, checked } = event.target;
        const selectedTag = { tagId: parseInt(value) };

        setPostObj((prevState) => ({
            ...prevState,
            PostTags: checked
                ? [...prevState.PostTags, selectedTag]
                : prevState.PostTags.filter(tag => tag.tagId !== selectedTag.tagId)
        }));
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
            <h1 className="page-heading">New Post</h1>
            <form onSubmit={handleSubmit} className="form-new-post">
                <div className="new-post-title">
                    <label>Title:</label>
                    <Input
                        type="text"
                        name="title"
                        value={postObj.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <Input
                        className="new-post-body"
                        name="body"
                        type="textarea"
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
                <div className="new-post-category">
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
                    <label>Estimated Read Time (minutes):</label>
                    <Input
                        type="number"
                        name="estimatedReadTime"
                        value={postObj.estimatedReadTime}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="new-post-tags">
                <label>Tags:</label>
                    {tags.map(tag => (
                        <div key={tag.id} className="form-check">
                            <Input
                                type="checkbox"
                                id={`tag-${tag.id}`}
                                value={tag.id}
                                checked={postObj.PostTags.some(selectedTag => selectedTag.tagId === tag.id)}
                                onChange={handleTagChange}
                            />
                            <label className="form-check-label" htmlFor={`tag-${tag.id}`}>
                                {tag.name}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="new-post-upload">
                    <label>Upload Header Image:</label>
                    <img style={{height: 120, width: 100}} src={imgSrc} className="card-img-top"/>   
                    <Input className="upload-btn" type="file" name="headerImage" onChange={handleFileChange} required />
                </div>
                <Button type="submit">Create Post</Button>
            </form>
        </>
    );
};