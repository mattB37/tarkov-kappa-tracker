export interface Item {
    name: string;
    shortName: string;
    iconLink: string;
    wikiLink: string;
    category: {
        normalizedName: string;
    };
}

export interface Objective {
    id: string;
    type: string;
    foundInRaid: boolean;
    count: number;
    items: Item[];
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
    minPlayerLevel: number;
}

export interface TaskData {
    tasks: Task[];
}

export interface SimpleTask {
    id: string;
    name: string;
    wikiLink: string;
    isDone: boolean;
}

export interface SimpleItem {
    id: number;
    name: string;
    shortName: string;
    neededCount: number;
    requiredFIR: boolean;
    iconLink: string;
    wikiLinkTask: string;
    wikiLinkItem: string;
    isForCollectorTask?: boolean;
    shouldRenderItemName?: boolean;
}