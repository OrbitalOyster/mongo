declare module "mongo" {
  export interface ICollectionIndex {
    name: string;
    expireAfterSeconds?: number;
  }
}
