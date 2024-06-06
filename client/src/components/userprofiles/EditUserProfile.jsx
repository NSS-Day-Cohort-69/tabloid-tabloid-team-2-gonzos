import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../managers/userProfileManager";
import "./EditUserProfile.css"
import { Button } from "reactstrap";

export const EditUserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    userName: '',
    email: '',
    roles: ['Author']
  });
  const [isFetching, setIsFetching] = useState(true);

  const fetchProfile = () => {
    getProfile(id).then(profile => {
      setUserProfile({
        userName: profile.userName || '',
        email: profile.email || '',
        roles: profile.roles || ['Author']
      });
      setIsFetching(false);
    });
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRoleChange = (e) => {
    setUserProfile(prevState => ({
      ...prevState,
      roles: [e.target.value]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(id, userProfile).then(() => {
      fetchProfile();
    });
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <form className="master-form" onSubmit={handleSubmit}>
      <h2>Edit User Profile</h2>
      <div className="post">
        <label>
          Username:
          <input
            type="text"
            name="userName"
            value={userProfile.userName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="post">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userProfile.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="post">
        <label>
          Role:
          <select
            name="roles"
            value={userProfile.roles[0]}
            onChange={handleRoleChange}
          >
            <option value="Author">Author</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
      </div>
      <Button color="success" type="submit" onClick={() => {navigate("/userprofiles")}}>Save</Button>
      <Button color="danger" type="button" onClick={() => {navigate("/userprofiles")}}>Cancel</Button>
    </form>
  );
};
