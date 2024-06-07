import { useEffect, useState } from "react"
import { deleteReaction, getReactions } from "../../managers/reactionManager"
import { Link, useNavigate } from "react-router-dom"
import { Button, Table } from "reactstrap"
import "./Reaction.css"
import ConfirmDelete from "../modals/ConfirmDelete"

export const Reaction=()=>{   
    const[allReactions,setAllReactions]=useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const[reactionIdToDelete,setReactionIdToDelete]=useState(0)
    const navigate=useNavigate();

    useEffect(()=>{
      getReactions().then(data=>{
        setAllReactions(data)
      })
    },[])

    
    const handleEdit=(e)=>{      
        navigate(`${e.target.name}`)
   
    }

    const toggleModal = () => {
      setModalOpen(!modalOpen);
    };

    const handleDeleteModal = (id) => {
      setReactionIdToDelete(id);
      toggleModal();
    };
  
    const handleDeleteReaction = (id) => {
      deleteReaction(reactionIdToDelete).then(()=>{
        toggleModal();
        getReactions().then(data=>{
          setAllReactions(data)
        })
        navigate(`/reactions`)
      })      
    };

    return <>    
      <Link to={`/reactions/newReaction`}>Add Reaction</Link>
      <div className="userprofile-container">
            <h2>
                Reactions
            </h2>
            <Table striped>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>ReactionEmoji</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    allReactions.map((r) => (                      
                        <tr key={r.id}>
                            <td>{r.name}</td>
                            <td>{r.reaction}</td>
                            <td>
                              <Button color="success" name={r.id} onClick={handleEdit}>
                                  Edit
                              </Button>
                            </td>
                            <td>
                            <Button color="danger" onClick={() => handleDeleteModal(r.id)}>
                              Delete
                            </Button>
                              <ConfirmDelete
                                  isOpen={modalOpen}
                                  toggle={toggleModal}
                                  confirmDelete={handleDeleteReaction}
                                  typeName={"reaction"}
                              />
                            </td>
                        </tr>   
                ))
                }
                </tbody>
            </Table>
        </div>
    </>
}