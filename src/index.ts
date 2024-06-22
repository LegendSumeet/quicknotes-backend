require('dotenv').config();

import { Elysia } from "elysia";
import { autoroutes } from "elysia-autoroutes";
import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import pino from "pino";
import staticPlugin from "@elysiajs/static";
import { serverTiming } from '@elysiajs/server-timing'

const logger = pino({});
const port = process.env.PORT ?? 3000;


const file = Bun.file("./public/index.html")

const QuickNotesApp = new Elysia()
    .use(staticPlugin())
    .use(serverTiming())

    .use(cors(
        {
            origin: /.*\.apiv1.toystack\.dev$/

        },

    ))

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
    .get("/", () => new Response(file, { status: 200 }))
    .listen(port);
logger.info(
    `🦊 Quick Notes is running at https://apiv1.toystack.dev/`,
);
export { QuickNotesApp };
export type App = typeof QuickNotesApp;

