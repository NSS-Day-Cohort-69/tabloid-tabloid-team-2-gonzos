const _apiURL="/api/reaction";

export const createReaction=async(reaction)=>{
    return await fetch(_apiURL,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reaction),
      }).then((res) => res.json);
}

export const getReactions = async() => {
  return await fetch(`${_apiURL}`).then((res) => res.json());
}

export const getReactionsById=async(id)=>{
  return await fetch(`${_apiURL}/${id}`).then((res)=>res.json());
}

export const updateReaction=async(reaction)=>{
  return await fetch(`${_apiURL}/${reaction.id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reaction),
    });
}

export const deleteReaction=async(id)=>{
  return await fetch(`${_apiURL}/${id}`,{
      method: "DELETE"
    });
}