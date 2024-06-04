import { useState, useEffect } from "react";
import { editCategory, getCategoryById } from "../../managers/categoryManager";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export const EditCategory = () => {
  const { id } = useParams();

  const [categoryObj, setCategoryObj] = useState({
    name: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getCategoryById(id).then((category) => {
      setCategoryObj({
        name: category.name,
      });
    });
  }, [id]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setCategoryObj({
      ...categoryObj,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editCategory(id, categoryObj)
      .then(() => {
        navigate(`/categories`);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };
  return (
    <>
      <h1>Edit Category</h1>
      <Form>
        <FormGroup>
          <Label>Enter Category Name</Label>
          <Input
            type="text"
            name="name"
            value={categoryObj.name || ""}
            onChange={handleChange}
          />
        </FormGroup>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </Form>
      <Button
        onClick={() => {
          navigate("/category");
        }}
      >
        Discard Changes
      </Button>
    </>
  );
};
