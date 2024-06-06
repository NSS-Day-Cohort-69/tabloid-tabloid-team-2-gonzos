import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../../managers/userProfileManager";

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState();

  const { id } = useParams();
  const navigate = useNavigate();



  useEffect(() => {
    getProfile(id).then(setUserProfile);
  }, [id]);

  let role = userProfile?.roles[0]
  role = role || "Author";

  if (!userProfile) {
    return null;
  }
  const imageUrl = `https://localhost:5001/Uploads/${userProfile.imageLocation}`;
  return (
    <>
      <div className="userprofile-container">
        <img style={{height: 100, width: 100}} src={imageUrl} alt={userProfile.firstName} />
        <h3>{userProfile.fullName}</h3>
        <p>Username: {userProfile.userName}</p>
        <p>Email: {userProfile.email}</p>
        <p>Creation Date: {userProfile.formattedDateTime}</p>
        <p>Role: {role}</p>
      </div>
    </>
  );
}
