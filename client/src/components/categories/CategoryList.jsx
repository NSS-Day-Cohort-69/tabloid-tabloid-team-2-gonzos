import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../managers/categoryManager";
import { EditCategory } from "./EditCategory";

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
          <p key={c.id}>
            {c.name}
            <button>
              <Link to={`/editcategory/${c.id}`}>Edit Category</Link>
            </button>
          </p>
        ))}
      </div>
      <button>
        <Link to={"/newcategory"}>New Category</Link>
      </button>
    </>
  );
}
