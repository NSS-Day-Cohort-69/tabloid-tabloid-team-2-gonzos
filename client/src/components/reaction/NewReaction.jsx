import { useState } from "react";
import { createReaction} from "../../managers/reactionManager"
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import "./Reaction.css"

export const NewReaction=()=>{
    const[reactionEmoji,setReaction]=useState("")
    const[name,setName]=useState("")
    const navigate=useNavigate();
    
    const handleInputChange=(event)=>{
        if(event.target.name=="reactionName")
        {
            setName(event.target.value);
        }
        if(event.target.name=="emoji")
        {
            setReaction(event.target.value);
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const reaction={
            name,
            reactionEmoji
        }
        createReaction(reaction).then(
            navigate("/reactions")
        )
    }
    return <>
        <Form className="reaction-container">
        <h2>Create Reaction</h2>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            name="reactionName"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Reaction</Label>
          <Input
            type="text"
            value={reactionEmoji}
            name="emoji"
            onChange={handleInputChange}
          >  
          </Input>
        </FormGroup>
        <Button onClick={handleSubmit} color="success">
          Submit
        </Button>
      </Form>
    </>
}