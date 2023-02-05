export interface Task{
    date: Date;
    name: string;
    start: number;
    end: number;
    description?: string;
}