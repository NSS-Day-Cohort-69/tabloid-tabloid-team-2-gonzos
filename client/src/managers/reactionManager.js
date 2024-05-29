const _apiURL="/api/reaction";

export const createReaction=(reaction)=>{
    return fetch(_apiURL,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reaction),
      }).then((res) => res.json);
}