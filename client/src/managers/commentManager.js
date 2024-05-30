const _apiUrl = "/api/Comment";

export const getComments = (id) => {
    return fetch(`${_apiUrl}/posts/${id}`).then((res) => res.json());
};