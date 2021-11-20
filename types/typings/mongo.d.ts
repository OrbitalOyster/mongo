declare module "mongo" {
    interface ICollectionIndex {
        name: string;
        expireAfterSeconds?: number;
    }
}
