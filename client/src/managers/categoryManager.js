const _catURL = "/api/category";

export const getAllCategories = () => {
  return fetch(_catURL).then((res) => res.json());
};
