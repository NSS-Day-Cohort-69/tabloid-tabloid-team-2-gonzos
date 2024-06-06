import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import CategoryList from "./categories/CategoryList";
import { Reaction } from "./reaction/Reaction";
import { ViewPosts } from "./posts/ViewPosts";
import TagsList from "./tags/TagsList.jsx";
import { PostDetails } from "./posts/PostDetails.jsx";
import { NewPost } from "./posts/NewPost.jsx";
import { ActivateAUserProfile } from "./userprofiles/ActviateAUserProfile.jsx";
import { DeactivateAUserProfile } from "./userprofiles/DeactviateAUserProfile.jsx";
import { EditPost } from "./posts/EditPost.jsx";
import { NewCategory } from "./categories/NewCategory.jsx";
import { NewTag } from "./tags/CreateTag.jsx";
import { EditComment } from "./posts/EditComment.jsx";
import { CommentDetail } from "./posts/CommentDetail.jsx";
import { MyPosts } from "./posts/MyPosts.jsx";
import { CommentList } from "./posts/CommentList.jsx";
import { EditCategory } from "./categories/EditCategory.jsx";
import { Home } from "./Home.jsx";
import { ApprovalList } from "./approval/ApprovalList.jsx";
import EditTag from "./tags/EditTag.jsx";
import { EditUserProfile } from "./userprofiles/EditUserProfile.jsx";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home loggedInUser={loggedInUser}/>
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
          <Route path="edit/:id" element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <EditUserProfile />
            </AuthorizedRoute>
          }/>
        </Route>
          <Route path="/tag">
            <Route index
              element={<AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}><TagsList /></AuthorizedRoute>} />
              <Route path="/tag/create" 
              element={<AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}><NewTag /></AuthorizedRoute>} />
              <Route path="/tag/edit/:tagId" 
              element={<AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}><EditTag/></AuthorizedRoute>} />
          </Route>
        <Route path="/approvals">
          <Route index element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <ApprovalList loggedInUser={loggedInUser}/>
            </AuthorizedRoute>} />
        </Route>
        <Route path="/reactions" element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <Reaction />
              </AuthorizedRoute>
            }/>   
          <Route path="/activateUserProfile" element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <ActivateAUserProfile />
              </AuthorizedRoute>
            }/>   
            <Route path="/deactivateUserProfile" element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <DeactivateAUserProfile />
              </AuthorizedRoute>
            }/>    
        <Route path="/newpost">
            <Route index element={<AuthorizedRoute loggedInUser={loggedInUser}><NewPost loggedInUser={loggedInUser}/></AuthorizedRoute>} />
        </Route>
        <Route path="/posts">
            <Route index element={<ViewPosts loggedInUser={loggedInUser} />}/>
            <Route path="edit/:id" element={<EditPost />}/>
            <Route path=":id" element={<PostDetails loggedInUser={loggedInUser}/>} />
            <Route path="editComment/:id" element={<EditComment loggedInUser={loggedInUser}/> } />
            <Route path="user/:id" element={<MyPosts loggedInUser={loggedInUser} />} />
        </Route>
        <Route path="/comments">
          <Route path="post/:id" element={<CommentList loggedInUser={loggedInUser} />} />
          <Route path="detail/:id" element={<CommentDetail loggedInUser={loggedInUser} />} />
        </Route>
        <Route
        path="/category"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}><CategoryList/></AuthorizedRoute>}/>
        <Route
          path="/newcategory"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <NewCategory />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/editcategory/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <EditCategory />
            </AuthorizedRoute>
          }
        />
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