import { useEffect, useState } from "react"
import { deactivateUserProfile, getAllActiveList } from "../../managers/userProfileManager"
import { Button, Table } from "reactstrap"
import { useNavigate } from "react-router-dom"
import "./UserProfile.css"

export const DeactivateAUserProfile=()=>{
    const[activeList,setActiveList]=useState([])
    const navigate=useNavigate();

    useEffect(()=>{
        getAllActiveList().then(data=>{
            setActiveList(data)
        })
    },[])

    const handleDeactivate=(e)=>{
        deactivateUserProfile(e.target.name).then(
            ()=>{
                getAllActiveList().then(data=>setActiveList(data))
                navigate(`/deactivateUserProfile`)
            }
        )
    }

    return <>
    <div className="userprofile-container">
        <h2>
            Deactivate a user Profile
        </h2>
        <div style={{alignContent:"center"}}>
        <Table striped>
            <thead>
                <tr>
                    <th>Users</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
            activeList.map((up) => (           
                <tr key={up.id}>
                    <td >
                        {up.firstName} {up.lastName} {up.userName}{" "}
                    </td>               
                    <td>
                        <Button color="danger" name={up.id} onClick={handleDeactivate}>
                            Deactivate
                        </Button>
                    </td>
                </tr>   
            ))
            }
            </tbody>
        </Table>
        </div>
    </div>
    </>
}