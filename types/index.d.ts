import mongoose from "mongoose";
export declare function connect(mongoUrl: string): Promise<void>;
export declare function setCollectionToExpire(collection: mongoose.Collection, expireAfterSeconds: number): Promise<void>;
export declare function close(): Promise<void>;
