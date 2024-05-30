const _apiUrl = "/api/userprofile";


export const getProfiles = () => {
  return fetch(_apiUrl + "/withroles").then((res) => res.json());
};

export const getProfile = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const getAllInactiveList=()=>{
  return fetch(_apiUrl + `/inactiveList`).then((res)=>res.json());
}

export const getAllActiveList=()=>{
  return fetch(_apiUrl + `/activeList`).then((res)=>res.json());
}

export const deactivateUserProfile=(id)=>{
  return fetch(_apiUrl+`/${id}`+`/deactivate`,{method:"POST"});
}

export const activateUserProfile=(id)=>{
  return fetch(_apiUrl+`/${id}`+`/activate`,{method:"POST"});
}
