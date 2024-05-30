import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTags } from "../../managers/tagManager.js";

export default function TagsList() {
  const [tags, setTags] = useState([]);

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
        <p key={t.id}>
          {t.name}
        </p>
      ))}
    </>
  );
}
