import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import { Reaction } from "./reaction/Reaction";
import { ViewPosts } from "./posts/ViewPosts";
import TagsList from "./tags/TagsList.jsx";
import { PostDetails } from "./posts/PostDetails.jsx";
import { NewPost } from "./posts/NewPost.jsx";
import { ReactivateAUserProfile } from "./userprofiles/ReactviateAUserProfile.jsx";
import { DeactivateAUserProfile } from "./userprofiles/DeactviateAUserProfile.jsx";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <p>Welcome to Tabloid!</p>
            </AuthorizedRoute>
          }
        />
        <Route path="/userprofiles">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileList />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileDetails />
              </AuthorizedRoute>
            }
          />
        </Route>
          <Route path="/tag">
            <Route
              index
              element={
                <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                  <TagsList />
                </AuthorizedRoute>
              }
            />
          </Route>
        <Route path="/reactions" element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <Reaction />
              </AuthorizedRoute>
            }/>   
          <Route path="/reactivateUserProfile" element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <ReactivateAUserProfile />
              </AuthorizedRoute>
            }/>   
            <Route path="/deactivateUserProfile" element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <DeactivateAUserProfile />
              </AuthorizedRoute>
            }/>    
        <Route path="/newpost">
            <Route index element={<NewPost />} />
        </Route>
        <Route path="/posts">
            <Route index element={<ViewPosts />}/>
            <Route path=":id" element={<PostDetails />} />
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
