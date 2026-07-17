declare module "cloudflare:workers" {
  export const env: {
    DB: D1Database;
    BUCKET: R2Bucket;
  };
}
interface Fetcher { fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> }
interface D1PreparedStatement { bind(...values: unknown[]): D1PreparedStatement; run(): Promise<unknown>; first<T=unknown>(): Promise<T|null> }
interface D1Database { prepare(query:string): D1PreparedStatement }
interface R2ObjectBody { body: ReadableStream; writeHttpMetadata(headers:Headers):void }
interface R2Bucket { put(key:string,value:ArrayBuffer,options?:unknown):Promise<unknown>; get(key:string):Promise<R2ObjectBody|null> }
