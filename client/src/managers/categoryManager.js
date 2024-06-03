const _catURL = "/api/category";

export const getAllCategories = () => {
  return fetch(_catURL).then((res) => res.json());
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
