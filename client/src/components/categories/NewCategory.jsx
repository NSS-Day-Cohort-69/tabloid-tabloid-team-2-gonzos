import CategoryList from "./CategoryList";
import { useEffect, useState } from "react";
import { createNewCategory } from "../../managers/categoryManager";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, Input, Label, Form } from "reactstrap";

export const NewCategory = () => {
  const [newCategory, setNewCategory] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name == "categoryName") {
      setNewCategory(event.target.value);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const category = { Name: newCategory };
    createNewCategory(category).then(() => {
      setTimeout(() => {
        navigate("/category");
      }, 250);
    });
  };
  

  return (
    <>
      <Form className="category-container">
        <h1>Create A New Category</h1>
        <FormGroup>
          <Label>Enter Category Name</Label>
          <Input
            type="text"
            value={newCategory}
            name="categoryName"
            onChange={handleChange}
          />
        </FormGroup>
        <Button
          color="success"
          onClick={handleSubmit}>Save</Button>
      </Form>
    </>
  );
};
