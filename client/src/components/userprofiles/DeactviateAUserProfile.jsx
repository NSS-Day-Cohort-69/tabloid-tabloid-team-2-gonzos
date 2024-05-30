import { useEffect, useState } from "react"
import { deactivateUserProfile, getAllActiveList } from "../../managers/userProfileManager"
import { Table } from "reactstrap"
import { useNavigate } from "react-router-dom"

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
    Deactivate a user Profile
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
                <td><button name={up.id} onClick={handleDeactivate}>Deactivate</button></td>
            </tr>   
          ))
        }
        </tbody>
    </Table>
    </div>
    </>
}