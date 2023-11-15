export class CreateRevenueDto {
    constructor(
        public carId: string,
        public total: number,
        public month: number,
    ){}
}
