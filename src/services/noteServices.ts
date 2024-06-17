import { Note, Notebook, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();


interface NoteWithRelations extends Note {
    sharedWith: User[];
    pendingUser: User[];
    user: User;
    Notebook?: Notebook | null;
}

const prismaService = {
    async createNote(data: Omit<Note, 'id'>): Promise<Note> {
        try {
            const note = await prisma.note.create({
                data,
            });
            return note;
        } catch (error) {
            throw new Error(`Unable to create note: ${error}`);
        }
    },

    async updateNote(id: number, data: Partial<Note>) {
        try {
            const note = await prisma.note.update({
                where: { id: id },
                data,
            });
            return note;
        } catch (error) {
            throw new Error(`Unable to update note with id ${id}: ${error}`);
        }
    },

    async deleteNote(id: number) {
        try {
            const note = await prisma.note.delete({
                where: { id: id },
            });
            return note;
        } catch (error) {
            throw new Error(`Unable to delete note with id ${id}: ${error}`);
        }
    },


    async getAllNotesByUserId(userId: number) {
        try {
            const notes = await prisma.note.findMany({
                where: {
                    userId: userId,
                },

            });
            return notes;
        } catch (error) {
            throw new Error(`Unable to fetch notes for userId ${userId}: ${error}`);
        }
    },

    async getAllNotes() {
        try {
            const notes = await prisma.note.findMany();
            return notes;
        } catch (error) {
            throw new Error(`Unable to fetch notes: ${error}`);
        }
    },

    async getNoteById(id: number) {
        try {
            const notes = await prisma.note.findFirst({
                where: {
                    id: id,
                },
            });
            return notes;
        } catch (error) {
            throw new Error(`Unable to fetch notes for userId ${id}: ${error}`);
        }
    },
};

export default prismaService;
