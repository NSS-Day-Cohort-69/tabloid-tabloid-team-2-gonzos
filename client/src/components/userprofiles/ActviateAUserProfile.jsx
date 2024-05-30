import { useEffect, useState } from "react"
import { activateUserProfile, getAllInactiveList } from "../../managers/userProfileManager"
import { Button, Table } from "reactstrap"
import { useNavigate } from "react-router-dom"

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
    Activate a user Profile
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
                    <td><button name={up.id} onClick={handleActivate}>Activate</button></td>
                </tr>   
          ))
        }
        </tbody>
    </Table>
    </>
}