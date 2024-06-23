import { broadcast, type App } from "../..";
import { createUser, findUserByEmail } from "../../services/userServices";

interface User {
  email: string;
  name: string;
}

export default (app: App) => {

  app.post("/register", async ({ body, error }) => {
    const { email, name } = body as User;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return error(409.1, "User already exists");
    }

    const newUser = await createUser(email, name);
    broadcast(JSON.stringify({ type: 'new_user', data: newUser}));

    return new Response(
      JSON.stringify({ status: "User created", data: newUser }),
      {
        status: 201,
      }
    );

  });

  app.get("/login", async ({ query, error }) => {
    const user = await findUserByEmail(query.email as string);
    if (!user) {
      return error(404.1, "User not found");
    }
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  });

  return app;
};

