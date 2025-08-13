export type Chapter = {
    title: string;
    nostrId: string;
};
export type Book = {
    route: string;
    title: string;
    chapters: Chapter[];
    nextRoute: string;
};
export type Section = {
    route: string;
    title: string;
    quote: string;
    image: string;
    books: Book[];
};
export interface NostrBookMapReference {
    sections: Section[];
}
export type BookSearchResult = {
    title: string;
    sectionName: string;
    chapter?: string;
    value?: string;
    verse: string;
    isPerfectMatch: boolean;
    bookOrder: number;
}
