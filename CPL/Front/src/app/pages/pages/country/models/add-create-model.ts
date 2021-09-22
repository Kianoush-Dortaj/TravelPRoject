export interface AddCategoryModel{
    id: string|null;
    name:string;
    parentId?:string | null;
    categoryPoster:any;
}