const _apiUrl = "/api/Comment";

export const getComments = (id) => {
    return fetch(`${_apiUrl}/posts/${id}`).then((res) => res.json());
};

export const createComment = async (commentObj) => {
    const response = await fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentObj)
    });

    const result = await response.json();
    return result
};

export const deleteComment = async (commentId) => {
    return fetch(`${_apiUrl}/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}