export interface Engine {
    query: (sequence: string, dbType: string) => Promise<string>;
}