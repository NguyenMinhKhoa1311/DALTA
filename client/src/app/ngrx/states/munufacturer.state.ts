import { Manufacturer } from "src/app/models/manufacturer.model";

export interface ManufacturerState {
    manufacturers: Manufacturer[];
    isGetting: boolean;
    isGetSuccess: boolean;
    getErrorMessage: string;
}