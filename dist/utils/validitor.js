export const validateUser = (email) => {
    if (!email) {
        throw new Error("All fields are required");
    }
};
