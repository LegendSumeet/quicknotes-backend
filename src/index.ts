import { Elysia, t } from "elysia";
import { autoroutes } from "elysia-autoroutes";

import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import swagger from "@elysiajs/swagger";
import pino from "pino";

const logger = pino({});


const port = process.env.PORT ?? 3000;
const app = new Elysia()
    .ws('/ws', {
        message(ws, message) {
            ws.send(message)
        }
    })
    .use(staticPlugin())
    .use(
        swagger({


            documentation: {
                info: {
                    title: "Quick Notes API",
                    description: "API for Quick Notes App",
                    version: "1.0.0",
                },

            },
        }),
    )
    .use(cors())
    .use(
        autoroutes({
            routesDir: "./routes",
        }),
    )
    .get("/", () => ({ status: "ok" }), {
        response: t.Object({
            status: t.String({
                description: "Returns ok for health check",
            }),
        }),
        detail: {
            description: "The root endpoint",
            tags: ["App"],
        },
    })

    .listen(port);

logger.info(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);

export { app };
export type App = typeof app;