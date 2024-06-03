const _apiUrl = "/api/reactionpost";

export const addReactionPost = async (reactionPost) => {
    const response = await fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reactionPost)
    })

    const res = await response.json();
}

export const deleteReactionPost = async (id) => {
    return await fetch(`${_apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const getPostsReactions = (postId) => {
    return fetch(`${_apiUrl}/${postId}`).then((res) => res.json());
  }