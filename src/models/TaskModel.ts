export interface TaskModel{
    id: string;
    title: string;
    description: string;
    dueDate: any;
    start: Date;
    end: Date;
    uids: string[];
    color?: string;
    fileUrls: string[];
    progress?: string
}