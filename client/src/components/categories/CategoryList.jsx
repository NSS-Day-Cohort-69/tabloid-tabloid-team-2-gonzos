import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../managers/categoryManager";
import ConfirmDelete from "../modals/ConfirmDelete";
import { deleteCategory } from "../../managers/categoryManager";
import { Button } from "reactstrap";
import "./Category.css"

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteCategoryById, setDeleteCategoryById] = useState(null);

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

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleDeleteModal = (id) => {
    setDeleteCategoryById(id);
    toggleModal();
  };

  const handleDeleteCategory = () => {
    deleteCategory(deleteCategoryById).then(() => {
      setCategories(categories.filter((c) => c.Id !== deleteCategoryById));
      toggleModal();
    });
  };
  return (
    <>
      <div className="category-container">
      <h2>Category List</h2>
      <div className="category-list">
          {categories.map((c) => (
            <div className="category-item" key={c.id}>
              <p>
                {c.name}
              </p>
              <Button color="success">
                <Link className="link" to={`/editcategory/${c.id}`}>
                  ✏️
                </Link>
              </Button>
              <Button color="danger" onClick={() => handleDeleteModal(c.id)}>
                🗑️
              </Button>
            </div>
          ))}
        </div>
        <Button color="success">
          <Link className="link" to={"/newcategory"}>New Category</Link>
        </Button>
        <ConfirmDelete
          isOpen={modalOpen}
          toggle={toggleModal}
          confirmDelete={handleDeleteCategory}
          typeName={"category"}
        />
      </div>
    </>
  );
}

//button after edit, import delete code, have function within exports that handles delete using imported function, deletes by id
//modals for pop up to confirm deletion in reactstrap check team-one-more-div
