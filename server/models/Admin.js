import mongoose from "mongoose";

export enum AccessLevel {
    READ_ONLY,
    READ_UPDATE_ONLY,
    READ_UPDATE_DELETE_ONLY
}

export enum AdminAction {

}

const adminTable = new mongoose.Schema({
    username: String;
    password: String;
    accessLevel: AccessLevel;
    actions: [
        {action: AdminAction, time: Date}
    ]
})