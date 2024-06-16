export const validateUser = (email: string) => {
    if (!email) {
      throw new Error("All fields are required");
    }
  };
  