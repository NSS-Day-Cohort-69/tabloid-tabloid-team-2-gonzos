import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTagById, updateTag } from '../../managers/tagManager.js';

export default function EditTag() {
  const { tagId } = useParams();
  const [tag, setTag] = useState({ name: '' });
  const navigate = useNavigate();

  useEffect(() => {
    getTagById(tagId).then(setTag);
  }, [tagId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTag({ ...tag, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTag(tag).then(() => {
      navigate('/tag');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tag Name:
        <input
          type="text"
          name="name"
          value={tag.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit">Update Tag</button>
    </form>
  );
}
