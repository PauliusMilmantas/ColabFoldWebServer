export interface Engine {
    query: (sequence: string) => Promise<string>;
}