const _apiUrl = "/api/tag";

export const getTags = () => {
    return fetch(_apiUrl).then((res) => res.json());
  };