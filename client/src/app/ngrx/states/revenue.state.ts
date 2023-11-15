import { Revenue } from "src/app/models/revenue.model";

export interface RevenueState {
    isUpdateTotalLoading: boolean;
    isUpdateTotalSuccess: boolean;
    updateTotalErrMess: string;
    revenue: Revenue
    }