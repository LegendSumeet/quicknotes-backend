import { createUser, findUserByEmail } from "../../services/userServices";
export default (app) => {
    app.post("/register", async ({ body, error }) => {
        const { email, name } = body;
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return error(409.1, "User already exists");
        }
        const newUser = await createUser(email, name);
        return new Response(JSON.stringify({ status: "User created", user: newUser }), {
            status: 201,
        });
    });
    app.get("/login", async ({ body, error }) => {
        const { email } = body;
        const user = await findUserByEmail(email);
        if (!user) {
            return error(404.1, "User not found");
        }
        return new Response(JSON.stringify(user), {
            status: 200,
        });
    });
    return app;
};
