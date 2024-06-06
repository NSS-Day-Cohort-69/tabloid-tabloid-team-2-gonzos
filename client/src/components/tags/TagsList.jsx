import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTags } from "../../managers/tagManager.js";
import { useNavigate } from "react-router-dom";
import "./Tags.css"
import { Button } from "reactstrap";

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
    <div className="tag-container">
        <h2>Tags</h2>
        <div className="tag-list">
          {tags.map((t) => (
            <div className="tag-item" key={t.id}>
              <p>{t.name}</p>
              <Button
                color="success"
                onClick={() => navigate(`/tag/edit/${t.id}`)}>
                Edit Tag
              </Button>
            </div>
          ))}
        </div>
        <Button
          color="success"
          onClick={() => {
            navigate(`/tag/create`);
          }}
        >
          Create New Tag
        </Button>
      </div>
    </>
  );
}
