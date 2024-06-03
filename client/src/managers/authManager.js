const _apiUrl = "/api/auth";

export const login = (email, password) => {
  return fetch(_apiUrl + "/login", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Authorization: `Basic ${btoa(`${email}:${password}`)}`,
    },
  }).then((res) => {
    if (res.status !== 200) {
      return Promise.resolve(null);
    } else {
      return tryGetLoggedInUser();
    }
  });
};

export const logout = () => {
  return fetch(_apiUrl + "/logout");
};

export const tryGetLoggedInUser = () => {
  return fetch(_apiUrl + "/me").then((res) => {
    return res.status === 401 ? Promise.resolve(null) : res.json();
  });
};

export const register = (userProfile) => {
  // userProfile.password = btoa(userProfile.password);
  //As using file type for Image Upload,changed object to formData for registration
  const formData = new FormData();
  formData.append('firstName', userProfile.firstName);
  formData.append('lastName', userProfile.lastName);
  formData.append('userName', userProfile.userName);
  formData.append('email', userProfile.email);
  formData.append('password', btoa(userProfile.password)); // Encode password
  formData.append('imageLocation', userProfile.imageLocation); // Assuming photo is a File object
  return fetch(_apiUrl + "/register", {
    credentials: "same-origin",
    method: "POST",
    body: formData,
  }).then((res) => {
    if (res.ok) {
      return fetch(_apiUrl + "/me").then((res) => res.json());
    } else if (res.status === 400) {
      return res.json();
    } else {
      return Promise.resolve({ errors: ["Unknown registration error"] });
    }
  });
};
