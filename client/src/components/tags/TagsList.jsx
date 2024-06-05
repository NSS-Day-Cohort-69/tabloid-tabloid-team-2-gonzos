import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteTag, getTags } from "../../managers/tagManager.js";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../modals/ConfirmDelete";

export default function TagsList() {
  const [tags, setTags] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTagById, setDeleteTagById] = useState(null);
  const navigate = useNavigate();

  const getTagList = () => {
    getTags().then(setTags);
  };
  useEffect(() => {
    getTagList();
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleDeleteModal = (id) => {
    setDeleteTagById(id);
    toggleModal();
  };

  const handleDeleteTag= () => {
    deleteTag(deleteTagById).then(() => {
      getTags().then((data) => {
        setTags(data)
      })
      toggleModal();
    });
  };
  
  return (
    <>
      <p>Tags</p>
      {tags.map((t) => (
        <div key={t.id}>
          <p>{t.name}</p>
          <button onClick={() => navigate(`/tag/edit/${t.id}`)}>Edit Tag</button>
          <button onClick={() => handleDeleteModal(t.id)}>
              Delete Tag
            </button>
        </div>
      ))}
      <button
        onClick={() => {
          navigate(`/tag/create`);
        }}
      >
        Create New Tag
      </button>
      <ConfirmDelete
        isOpen={modalOpen}
        toggle={toggleModal}
        confirmDelete={handleDeleteTag}
        typeName={"tag"}
      />
    </>
  );
}
