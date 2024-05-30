import { useEffect, useState } from "react"
import { getAllActiveList } from "../../managers/userProfileManager"

export const DeactivateAUserProfile=()=>{
    const[activeList,setActiveList]=useState([])

    useEffect(()=>{
        getAllActiveList().then(data=>{
            setActiveList(data)
        })
    },[])

    return <>
    Deactivate a user Profile
    {
        activeList.map((up) => (
            <p key={up.id}>
              {up.firstName} {up.lastName} {up.userName}{" "}
              {/* <Link to={`/userprofiles/${p.id}`}>Details</Link> */}
            </p>
          ))
    }
    </>
}