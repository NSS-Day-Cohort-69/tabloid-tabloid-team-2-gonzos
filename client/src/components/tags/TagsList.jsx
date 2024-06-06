import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteTag, getTags } from "../../managers/tagManager.js";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../modals/ConfirmDelete";
import "./Tags.css"
import { Button } from "reactstrap";

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
    <div className="tag-container">
      <p>Tags</p>
      {tags.map((t) => (
        <div className="tag-item" key={t.id}>
          <p>{t.name}</p>
          <Button color="success" onClick={() => navigate(`/tag/edit/${t.id}`)}>Edit Tag</Button>
          <Button color="danger" onClick={() => handleDeleteModal(t.id)}>
              Delete Tag
            </Button>
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
      </div>
    </>
  );
}
