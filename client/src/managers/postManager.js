const _apiUrl = "/api/post";

export const getPosts = () => {
    return fetch(_apiUrl).then((res) => res.json())
}

export const getPostById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json())
}

export const getUserSubscribedPosts = (userId) => {
    return fetch(`${_apiUrl}/subscriptions/${userId}`).then((res) => res.json());
}

export const createPost = async (postObj) => {
    // Convert image file to base64 string
    const convertImageToBase64 = (imageFile) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(imageFile);
        });
    };

    if (postObj.headerImage) {
        try {
            postObj.headerImage = await convertImageToBase64(postObj.headerImage);
        } catch (error) {
            throw new Error("Failed to convert image to base64");
        }
    }
    const response = await fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
    });

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    const result = await response.json();
    return result.id;
};

export const updatePost = async (postId, updatedPostObj) => {
    const response = await fetch(`${_apiUrl}/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPostObj)
    });

    if (!response.ok) {
        throw new Error("Failed to update post");
    }
};

export const deletePost = (postId) => {
    return fetch(`${_apiUrl}/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const getPostsByUserId = async (userId) => {
    return await fetch(`${_apiUrl}/user/${userId}`).then((res) => res.json())
}

export const getUnapprovedPosts = () => {
    return fetch(`${_apiUrl}/unapproved`).then((res) => res.json())
}

export const getApprovedPosts = () => {
    return fetch(`${_apiUrl}/approved`).then((res) => res.json())
}

export const approvePostById = (postId) => {
    return fetch(`${_apiUrl}/${postId}/approve`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const unApproveAPost=async(id)=>{
    return await fetch(`${_apiUrl}/${id}/unApprove`,{method:"POST"})
}