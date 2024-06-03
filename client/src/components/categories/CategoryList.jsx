import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../managers/categoryManager";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    getAllCategories().then((data) => {
      const sortedCategories = data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCategories(sortedCategories);
    });
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <p>Category List</p>
      <div>
        {categories.map((c) => (
          <p key={c.id}>{c.name}</p>
        ))}
      </div>
      <button>
        <Link to={"/newcategory"}>New Category</Link>
      </button>
    </>
  );
}
