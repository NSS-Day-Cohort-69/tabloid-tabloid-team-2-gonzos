const _apiUrl = "/api/tag";

export const getTags = () => {
    return fetch(_apiUrl).then((res) => res.json());
  };

export const createTag=(tag)=>{
  return fetch(_apiUrl,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    }).then((res) => res.json);
  };

  export const getSearchPostByTag = (tagName) => {
    return fetch(`/api/tag/posts/searchPostsByTag/${tagName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      });
  };