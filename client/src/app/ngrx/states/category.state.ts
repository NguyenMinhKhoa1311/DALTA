import { Category } from "src/app/models/category.model";

export interface categoryState {
    categories: Category[];
    isGetting: boolean;
    isGetSuccess: boolean;
    getErrorMessage: string;
}