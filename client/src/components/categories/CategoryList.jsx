import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../managers/categoryManager";
import ConfirmDelete from "../modals/ConfirmDelete";
import { deleteCategory } from "../../managers/categoryManager";

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
      <p>Category List</p>
      <div>
        {categories.map((c) => (
          <p key={c.id}>
            {c.name}
            <button>
              <Link to={`/editcategory/${c.id}`}>Edit Category</Link>
            </button>
            <button onClick={() => handleDeleteModal(c.id)}>
              Delete Category
            </button>
          </p>
        ))}
      </div>
      <button>
        <Link to={"/newcategory"}>New Category</Link>
      </button>
      <ConfirmDelete
        isOpen={modalOpen}
        toggle={toggleModal}
        confirmDelete={handleDeleteCategory}
        typeName={"category"}
      />
    </>
  );
}

//button after edit, import delete code, have function within exports that handles delete using imported function, deletes by id
//modals for pop up to confirm deletion in reactstrap check team-one-more-div
