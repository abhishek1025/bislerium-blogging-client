import { Route, Routes } from "react-router-dom";
import { PostDetails, PostForm, Posts } from "../pages";
import { AuthorizeRoute } from "../components";

const PostRoutes = () => {
    return (
        <Routes>
            <Route index element={<Posts />} />
            <Route path=":postID" element={<PostDetails />} />
            <Route
                path="new"
                element={
                    <AuthorizeRoute
                        pathToNavigateIfNotAuthorized="/posts"
                        notAllowedRoles={["user"]}
                    >
                        <PostForm />
                    </AuthorizeRoute>
                }
            />
        </Routes>
    );
};

export default PostRoutes;
