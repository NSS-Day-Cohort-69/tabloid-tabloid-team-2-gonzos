import { useEffect, useState } from "react";
import { getProfiles } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";

export default function UserProfileList() {
  const [userprofiles, setUserProfiles] = useState([]);

  const getUserProfiles = () => {
    getProfiles().then(setUserProfiles);
  };
  useEffect(() => {
    getUserProfiles();
  }, []);
  return (
    <>
      <p>User Profile List</p>
      <div><Link to={`/activateUserProfile`}>Activate a UserProfile</Link></div>
      <div><Link to={`/DeactivateUserProfile`}>Deactivate a UserProfile</Link></div>
      <div></div>
      {userprofiles.map((p) =>(        
        <p key={p.id}>
          {p.firstName} {p.lastName} {p.userName}{" "}
          <Link to={`/userprofiles/${p.id}`}>Details</Link>
        </p>
      ))}
    </>
  );
}
