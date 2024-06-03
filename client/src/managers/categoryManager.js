const _catURL = "/api/category";

export const getAllCategories = () => {
  return fetch(_catURL).then((res) => res.json());
};

export const getCategoryById = (id) => {
  return fetch(`${_catURL}/${id}`).then((res) => res.json());
};

export const createNewCategory = (category) => {
  return fetch(_catURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(category),
  }).then((res) => res.json());
};

export const editCategory = (id, category) => {
  return fetch(`${_catURL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(category),
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          const error = text ? JSON.parse(text) : {};
          throw new Error(
            `HTTP error! status: ${res.status}, message: ${
              error.message || "Unknown error"
            }`
          );
        });
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};
