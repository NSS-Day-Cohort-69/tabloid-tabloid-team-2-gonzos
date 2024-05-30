const _apiUrl = "/api/userprofile";


export const getProfiles = () => {
  return fetch(_apiUrl + "/withroles").then((res) => res.json());
};

export const getProfile = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const getAllInactiveList=()=>{
  const url=_apiUrl + `/inactiveList`
  return fetch(url).then((res)=>res.json());
}

export const getAllActiveList=()=>{
  return fetch(_apiUrl + `/activeList`).then((res)=>res.json());
}
