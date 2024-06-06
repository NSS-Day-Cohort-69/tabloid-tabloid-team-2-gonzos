import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTagById, updateTag } from '../../managers/tagManager.js';
import { Button, Input } from 'reactstrap';

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
    <form onSubmit={handleSubmit} className='tag-container'>
      <h2>
        Tag Name
      </h2>
        <Input
          type="text"
          name="name"
          value={tag.name}
          onChange={handleInputChange}
          required
        />
      <Button
        className='update-tag-btn'
        color='success'
        type="submit">
          Update Tag
      </Button>
    </form>
  );
}
