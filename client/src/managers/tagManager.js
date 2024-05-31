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