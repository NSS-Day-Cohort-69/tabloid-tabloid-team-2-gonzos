import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTags } from "../../managers/tagManager.js";
import { useNavigate } from "react-router-dom";

export default function TagsList() {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const getTagList = () => {
    getTags().then(setTags);
  };
  useEffect(() => {
    getTagList();
  }, []);
  
  return (
    <>
      <p>Tags</p>
      {tags.map((t) => (
        <div key={t.id}>
          <p>{t.name}</p>
          <button onClick={() => navigate(`/tag/edit/${t.id}`)}>Edit Tag</button>
        </div>
      ))}
      <button
        onClick={() => {
          navigate(`/tag/create`);
        }}
      >
        Create New Tag
      </button>
    </>
  );
}
