
export interface Itodo{
    id: string;
    title: String;
    description: String;
    isCompleted: boolean;
    isArchived: boolean;
    endDate: Date | number | string;
    selected: boolean;
}