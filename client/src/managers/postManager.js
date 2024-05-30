const _apiUrl = "/api/post";

export const getPosts = () => {
    return fetch(_apiUrl).then((res) => res.json())
}

export const getPostById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json())
}

export const createPost = async (postObj) => {
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

