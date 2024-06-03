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
        <p key={t.id}>{t.name}</p>
      ))}
      <button onClick={() => {navigate(`/tag/create`);
        
      }}
      >
        Create New Tag
      </button>
    </>
  );
}
