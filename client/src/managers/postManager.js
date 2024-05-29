const _apiUrl = "/api/post";

export const getPosts = () => {
    return fetch(_apiUrl).then((res) => res.json())
}