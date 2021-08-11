import { ICollectionIndex } from "../types/mongo";
import mongoose from "mongoose";

export async function connect(mongoUrl: string): Promise<void> {
  /* Get rid of deprecation warnings */
  const connectionOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };
  mongoose.connection.on("connected", () => console.log("Connected to DB"));
  mongoose.connection.on("disconnected", () =>
    console.log("Disconnected from DB")
  );
  await mongoose.connect(mongoUrl, connectionOpts);
}

async function setCreatedAtIndex(
  collection: mongoose.Collection,
  expireAfterSeconds?: number
): Promise<void> {
  await collection.createIndex(
    { createdAt: 1 },
    {
      name: "createdAt",
      expireAfterSeconds,
    }
  );
}

/* Checks if collection exists */
async function collectionExists(collectionName: string): Promise<boolean> {
  return !!(await mongoose.connection.db
    .listCollections({ name: collectionName })
    .next());
}

/* Returns collection index */
async function getIndex(
  collection: mongoose.Collection,
  indexName: string
): Promise<ICollectionIndex | null> {
  const indexes = <Array<ICollectionIndex>>await collection.indexes();
  return indexes.find((i: ICollectionIndex) => i.name === indexName) || null;
}

export async function setCollectionToExpire(
  collection: mongoose.Collection,
  expireAfterSeconds: number
): Promise<void> {
  if (await collectionExists(collection.collectionName)) {
    /* Get createdAt index */
    const createdAtIndex = await getIndex(collection, "createdAt");
    /* Check if it exists and correct */
    if (
      !createdAtIndex ||
      !createdAtIndex.expireAfterSeconds ||
      createdAtIndex.expireAfterSeconds !== expireAfterSeconds
    ) {
      console.log(`Dropping ${collection.collectionName} createdAt indexes`);
      await collection.dropIndex("createdAt");
      await setCreatedAtIndex(collection, expireAfterSeconds);
    }
  } else await setCreatedAtIndex(collection, expireAfterSeconds);
}

export async function close(): Promise<void> {
  await mongoose.disconnect();
}
