import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getReactionsById, updateReaction } from "../../managers/reactionManager" 
import { Button, Input } from "reactstrap"

export const EditReaction=()=>{
    const[reaction,setReaction]=useState({})
    const{id}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        getReactionsById(id).then(data=>{
            setReaction(data)
        })
    },[])

    const handleInputChange=(event)=>{
        const reactionCopy={...reaction}
        if(event.target.name==="name")
        {
           reactionCopy[event.target.name]=event.target.value
        }
        else
        {
            reactionCopy[event.target.name]=event.target.value
        }
        setReaction(reactionCopy)
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        updateReaction(reaction).then(()=>{
            navigate(`/reactions`)
        })
    }

    return (
        <>
        <h1 className="edit-post-title">Edit Reaction</h1>
            <form onSubmit={handleSubmit} className="edit-post-form">
                <div>
                    <label>Name:</label>
                    <Input
                        type="text"
                        name="name"
                        value={reaction.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>ReactionEmoji:</label>
                    <Input
                        name="reactionEmoji"
                        type="text"
                        value={reaction.reactionEmoji}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="edit-post-btns">
                    <Button type="submit">Update Reaction</Button>
                    <Button onClick={() => {
                        navigate("/reactions")
                        }}>
                        Cancel
                    </Button>
                </div>
            </form>
            </>
    )
}