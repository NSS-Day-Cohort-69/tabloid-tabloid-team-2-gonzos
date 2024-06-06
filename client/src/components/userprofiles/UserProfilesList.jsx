import { useEffect, useState } from "react";
import { getProfiles } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";
import "./UserProfile.css"
import { Button } from "reactstrap";

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
    <div className="userprofile-container">
        <h2>User Profile List</h2>
        <div className="userprofile-list">
          {userprofiles.map((p) =>(        
            <div className="userprofile-item" key={p.id}>
              <div className="item-detail">
                <p>Full Name: {p.firstName} {p.lastName}</p>
                <p>Username: {p.userName}</p>
              </div>
              <Button color="info">
                <Link className="link" to={`/userprofiles/${p.id}`}>Details</Link>
              </Button>
            </div>
          ))}
        </div>
        <div className="userprofile-btns">
          <div>
            <Button color="success">
              <Link className="link" to={`/activateUserProfile`}>
                Activate a UserProfile
              </Link>
            </Button>
          </div>
          <div>
            <Button color="danger">
              <Link className="link" to={`/DeactivateUserProfile`}>
                Deactivate a UserProfile
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
