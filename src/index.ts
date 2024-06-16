import { Elysia } from "elysia";
import { autoroutes } from "elysia-autoroutes";
import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import pino from "pino";
import staticPlugin from "@elysiajs/static";
const logger = pino({});
const port = process.env.PORT ?? 3000;
const QuickNotesApp = new Elysia()
    .use(staticPlugin())

    .ws('/ws', {
        message(ws, message) {
            ws.send(message)
        }
    })
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
            routesDir: './routes',
        }),
    )
    .listen(port);
logger.info(
    `🦊 Elysia is running at http://${QuickNotesApp.server?.hostname}:${QuickNotesApp.server?.port}`,
);
export { QuickNotesApp };
export type App = typeof QuickNotesApp;

