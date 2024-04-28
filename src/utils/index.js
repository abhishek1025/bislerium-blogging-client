import { toast } from "react-toastify";
import { SERVER_URL } from "../config";
export * from "./alerts";
export * from "./api";
export * as apiHandler from "./api";
export * from "./handleCookies";
export * from "./hooks";

export const hasUserVoted = (votes = [], userID) => {
    const userVote = votes.find((vote) => vote.user === userID);

    return userVote ? userVote.votingStatus : "";
};

export const formatImageUrl = (url) => {
    if (!url) {
        return;
    }

    if (url.startsWith("https://")) {
        return url;
    }

    return `${SERVER_URL}/${url}`;
};

export const formatViews = (views) => {
    const viewsCount = views.length;

    return viewsCount > 1000 ? viewsCount / 1000 : viewsCount;
};

export const showUnauthorizedAccessToast =
    ({ navigate, path, currentUser, allowedRoles = ["mentor", "admin"] }) =>
    () => {
        if (allowedRoles.includes(currentUser?.role)) {
            navigate(path);
            return;
        }

        toast.warning("You do not have permission to access this feature.", {
            theme: "dark",
        });
    };

export const formatDataForDashboardChart = (items) => {
    return {
        labels: items.map(({ month }) => month),
        data: items.map(({ count }) => count),
    };
};

