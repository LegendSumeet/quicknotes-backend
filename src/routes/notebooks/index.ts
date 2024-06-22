import { Note } from "@prisma/client";
import type { App } from "../..";
import prismaService from "../../services/noteServices";

export default (app: App) => {
  app.post("/createnote", async ({ body }) => {
    try {
      const createNote = await prismaService.createNote(body as Note);
      return new Response(
        JSON.stringify({ status: "Note created", data: createNote }),
        {
          status: 201,
        }
      );
    } catch (error) {
      return new Response(JSON.stringify({ status: "Note not created", error: error }), { status: 500, });
    }
  });

  app.get("/getuserallnotebyid", async ({ query, error }) => {
    try {

      const userID = parseInt(query.userId as string, 10);
      if (!userID) return error(400.1, "User id is required");
      const allNotes = await prismaService.getAllNotesByUserId(userID);
      if (!allNotes) {
        return error(404.1, "User not found");
      }
      return new Response(JSON.stringify({
        status: "User found",
        data: allNotes
      }),
        { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ status: "Note not created", error: error }), { status: 500, });
    }

  });

  app.get("/getnotebyid", async ({ query, error }) => {
    try {
      if (!query.id) return error(400.1, "User id is required");
      const userID = parseInt(query.id as string, 10);

      const allNotes = await prismaService.getNoteById(userID);
      if (!allNotes) {
        return error(404.1, "User not found");
      }
      return new Response(JSON.stringify({
        status: "User found",
        data: allNotes

      }), {
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ status: "Note not created", error: error }), { status: 500, });
    }

  });

  app.delete("/deletenote", async ({query }) => {
    try {
  const userid = parseInt(query.id as string, 10);
      const deleteNote = await prismaService.deleteNote(userid);
      return new Response(
        JSON.stringify({ status: "Note deleted", data: deleteNote }),
        {
          status: 204,
        }
      );
    } catch (error) {
      return new Response(JSON.stringify({ status: "Note not deleted", error: error }), { status: 500, });
    }
  });

  app.put("/updatenote", async ({ body }) => {
    try {
      const { id, data } = body as { id: number, data: Partial<Note> };
      const updateNote = await prismaService.updateNote(id, data);
      return new Response(
        JSON.stringify({ status: "Note updated", data: updateNote }),
        {
          status: 200,
        }
      );
    }
    catch (error) {
      return new Response(JSON.stringify({ status: "Note not updated", error: error }), { status: 500, });
    }
  });

  return app;
};