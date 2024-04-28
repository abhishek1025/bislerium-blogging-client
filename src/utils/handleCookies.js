export const getAuthTokenFromCookie = () => {
    const cookies = document.cookie.split("; ");
    const authToken = cookies.find((cookie) => {
        return cookie.split("=")[0] === "authToken";
    });

    if (authToken) return authToken.split("=")[1];

    return null;
};

export const createCookie = (name, value, daysToExpire) => {
    const date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000); // Convert days to milliseconds
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const removeCookie = (name = "authToken") => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const getUserIDFromCookie = () => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => {
        return cookie.split("=")[0] === "user";
    });

    if (cookie) return JSON.parse(cookie.split("=")[1])._id;

    return null;
};
