import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../managers/userProfileManager";

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState();

  const { id } = useParams();



  useEffect(() => {
    getProfile(id).then(setUserProfile);
  }, [id]);

  let role = userProfile?.roles[0]
  role = role || "Author";

  if (!userProfile) {
    return null;
  }
  return (
    <>
      <img src={userProfile.imageLocation} alt={userProfile.firstName} />
      <h3>{userProfile.fullName}</h3>
      <p>Username: {userProfile.userName}</p>
      <p>Email: {userProfile.email}</p>
      <p>Creation Date: {userProfile.formattedDateTime}</p>
      <p>Role: {role}</p>
    </>
  );
}
