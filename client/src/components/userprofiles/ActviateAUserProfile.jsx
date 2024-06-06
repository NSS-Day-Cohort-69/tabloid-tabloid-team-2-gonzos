import { useEffect, useState } from "react"
import { activateUserProfile, getAllInactiveList } from "../../managers/userProfileManager"
import { Button, Table } from "reactstrap"
import { useNavigate } from "react-router-dom"
import "./UserProfile.css"

export const ActivateAUserProfile=()=>{
    const[inactiveList,setInactiveList]=useState([])
    const navigate=useNavigate();

    useEffect(()=>{
        getAllInactiveList().then(data=>{
            setInactiveList(data)
        })
    },[])

    const handleActivate=(e)=>{
        activateUserProfile(e.target.name).then(
            ()=>{
                getAllInactiveList().then(data=>{
                    setInactiveList(data)
                })
                navigate(`/activateUserProfile`)
            }
        )
    }

    return <>
        <div className="userprofile-container">
            <h2>
                Activate a user Profile
            </h2>
            <Table striped>
                <thead>
                <tr>
                    <th>Users</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    inactiveList.map((up) => (                      
                        <tr key={up.id}>
                            <td>{up.firstName} {up.lastName} {up.userName}{" "}</td>
                            <td>
                                <Button color="success" name={up.id} onClick={handleActivate}>
                                    Activate
                                </Button>
                            </td>
                        </tr>   
                ))
                }
                </tbody>
            </Table>
        </div>
    </>
}