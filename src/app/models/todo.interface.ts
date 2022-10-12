
export interface Itodo{
    id: number;
    title: String;
    description: String;
    isCompleted: boolean;
    isArchived: boolean;
    endDate: Date | number | string;
    selected: boolean;
}