
export interface Author {
    name: string;
    lastname: string;
}

export interface Items {
    author: Author;
    categories: Array<string>;
    items: Array<string>;
}


export interface Item {
    author: Author;
    item: object;
}
