import { useEffect, useState } from "react"
import { getAllInactiveList } from "../../managers/userProfileManager"

export const ReactivateAUserProfile=()=>{
    const[inactiveList,setInactiveList]=useState([])

    useEffect(()=>{
        getAllInactiveList().then(data=>{
            setInactiveList(data)
        })
    },[])

    return <>
    Reactivate a user Profile
    {
        inactiveList.map((up) => (
            <p key={up.id}>
              {up.firstName} {up.lastName} {up.userName}{" "}
              {/* <Link to={`/userprofiles/${p.id}`}>Details</Link> */}
            </p>
          ))
    }
    </>
}