export interface Task{
    date: Date;
    name: string;
    start: Date;
    end: Date;
    distractions?: Array<Date>;
    coins: number;
    description?: string;
}