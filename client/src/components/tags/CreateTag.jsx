import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { createTag } from "../../managers/tagManager.js";



export const NewTag = () => {
    const [newTag, setNewTag] = useState("")
    const navigate = useNavigate();

    const handleInputChange=(e)=>{
        if(e.target.name == "tagName")
            {
                setNewTag(e.target.value);
            }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const tag = {Name:newTag}
        createTag(tag).then(navigate("/tag"))
    }

    return <>
      <Form className="tag-container">
        <h2>Create A New Tag</h2>
          <FormGroup>
            <Label>Enter New Tag Name</Label>
            <Input
              type="text"
              value={newTag}
              name="tagName"
              onChange={handleInputChange}
            />
          </FormGroup>
          <Button onClick={handleSubmit} color="success">
            Submit New Tag
          </Button>
      </Form>
    </>
}