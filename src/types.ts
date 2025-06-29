export interface User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
}




// table types

export interface TableRow {
    id: string;
    name: string;
    createdAt: string;
    createdBy: string;
    type: string;
    status: string;
}

export interface Column {
    key: keyof TableRow;
    type: string;
    label: string;
}