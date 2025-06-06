export type HeaderLink = {
    name: string,
    href: string,
}

export const HEADERLINKS: Array<HeaderLink> = [
    {
        name: "Tasks",
        href: "/#/task-tracker"
    },
    {
        name: "Items",
        href: "/#/item-tracker"
    },
    {
        name: "Hideout",
        href: "/#/hideout-tracker"
    }
];
