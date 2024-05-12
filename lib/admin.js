export const isAdmin = (userId) => {
    return userId === process.env.NEXT_PUBLIC_ADMIN_ID;
};