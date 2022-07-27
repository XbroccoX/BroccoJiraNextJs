import mongoose from "mongoose"
import { db } from ".";
import { Entry, IEntry } from "../models";

export const getEntrybyId = async (id: string): Promise<IEntry | null> => {
    if (!mongoose.isValidObjectId(id)) return null

    await db.connect();
    const entry = await Entry.findById(id).lean();//el lean es propio de mongoose y ho que significa es trabajar con menos objetos
    await db.disconnect();


    return JSON.parse(JSON.stringify(entry));
};


