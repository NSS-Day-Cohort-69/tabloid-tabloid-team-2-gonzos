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

  export const getTagById = (id) => {
    return fetch(`${_apiUrl}/${id}`)
      .then((response) => response.json());
  };
  
  export const updateTag = (tag) => {
    return fetch(`${_apiUrl}/${tag.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tag),
    });
  };
  
  export const deleteTag = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      }
    });
  };

  