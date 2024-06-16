import type { App } from "../..";
import { createUser, findUserByEmail } from "../../services/userServices";

interface User {
  email: string;
  name: string;
}

export default (app: App) => {
  app.post("/register",

    async ({ body, error }) => {


      const { email, name } = body as User;
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return error(409.1, "User already exists");
      }
      const newUser = await createUser(email, name);
      return new Response(
        JSON.stringify({ status: "User created", user: newUser }),
        {
          status: 201,
        }
      );

    }

  );

  app.get("/login", async ({ body, error }) => {
    const { email } = body as User;
    const user = await findUserByEmail(email);
    if (!user) {
      return error(404.1, "User not found");
    }
    return new Response(JSON.stringify({
      status: "User found",
      user: user
    
    }), {
      status: 200,
    });
  });


  return app;
};

