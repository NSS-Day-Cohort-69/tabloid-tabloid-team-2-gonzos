const _apiUrl = "/api/post";

export const getPosts = () => {
    return fetch(_apiUrl).then((res) => res.json())
}

export const getPostById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json())
}