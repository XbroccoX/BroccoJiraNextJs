
interface SeedData {
    entries: SeedEntry[];
}


interface SeedEntry {
    description: string;
    status: string;
    createAt: number;
}


export const seedData: SeedData = {
    entries: [
        {

            description: 'Pendiente: Lorem Ipsum is simply dummy text of the printing and typesetting',
            status: 'pending',
            createAt: Date.now(),
        },
        {

            description: 'En Progreso: Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam nec mi nec felis laoreet venenatis.',
            status: 'in-progress',
            createAt: Date.now() - 1000000,
        },
        {

            description: 'Terminadas: Nulla posuere elementum eros at ultrices. Nunc quis lacus a urna consectetur sollicitudin non sit amet elit',
            status: 'finished',
            createAt: Date.now() - 100000,
        }
    ]
}