export interface Item {
    name: string;
}

export interface Objective {
    id?: string;
    foundInRaid?: boolean;
    count?: number;
    description?: string;
    items?: Item[];
}

export interface Trader {
    name: string;
}

export interface Task {
    id: string;
    name: string;
    kappaRequired: boolean;
    wikiLink: string;
    trader: Trader;
    objectives: Objective[];
}

export interface TaskData {
    tasks: Task[];
}

export interface SimpleTask {
    id: string;
    name: string;
    wikiLink: string;
}