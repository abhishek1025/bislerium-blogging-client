import { getRequest, postRequest } from "../utils";

export const getPostByID = (postID) => async () => {
    const res = await getRequest({
        endpoint: `/posts/${postID}`,
    });

    return res?.data || {};
};

export const recordPostViews = async ({ userID, postID }) => {
    await postRequest({
        endpoint: "/posts/views",
        data: { userID, postID },
    });
};

export const getPostsOfFollowingMentor =
    ({ userID, LIMIT, searchText }) =>
    async ({ queryKey }) => {
        const res = await getRequest({
            endpoint: `/posts/user/${userID}/following-mentor?page=${queryKey[0]}&limit=${LIMIT}&search=${searchText}`,
        });

        return res?.data || [];
    };

export const getFeaturedMentors = async () => {
    const res = await getRequest({
        endpoint: "/posts/featured-mentors",
    });
    return res?.data || [];
};

export const getTrendingPosts = async ({ queryKey }) => {
    const res = await getRequest({
        endpoint: `/posts/trending-posts?duration=${queryKey[0]}`,
    });
    return res?.data || [];
};
