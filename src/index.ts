require('dotenv').config();

import { Elysia } from "elysia";
import { autoroutes } from "elysia-autoroutes";
import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import pino from "pino";
import staticPlugin from "@elysiajs/static";


const logger = pino({});
const port = process.env.PORT ?? 3000;
const file = Bun.file("./public/index.html")
const clients: WebSocket[] = [];

const broadcast = (data: string) => {
    console.log(clients.length)
    console.log(data)
    clients.forEach((client) => {
        client.send(data);
    });
};



const QuickNotesApp = new Elysia()
    .use(staticPlugin())
    .use(
        autoroutes({
            routesDir: './routes',
        }),
    )
    .get("/", () => new Response(file, { status: 200 }))
    .use(cors(
        {
            origin: [/.*\.apiv1.toystack\.dev$/, /.*\.toystack\.dev$/, 'http://localhost:3000'],

        },

    ))
    .ws('/ws', {
        open(ws) {
            ws.send("Welcome to Quick Notes")
            clients.push(ws as unknown as WebSocket);
            console.log(clients.length)
        },
        message(ws, message) {
            console.log(ws)
            console.log(message)
        },
        close(ws) {
            ws.send("Goodbye")
            const index = clients.indexOf(ws as unknown as WebSocket);
            if (index !== -1) {
                clients.splice(index, 1);
            }
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
    .listen(port);


    
logger.info(
    `🦊 Quick Notes is running at https://apiv1.toystack.dev/ ${port}`,
);
export { QuickNotesApp, broadcast };
export type App = typeof QuickNotesApp;
