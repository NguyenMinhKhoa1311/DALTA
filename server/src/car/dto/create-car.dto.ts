export class CreateCarDto {
    constructor(
        public carId: string,
        public name: string,
        public model: string,
        public categoryId: string,
        public manufacturerId: string,
        public ownerId: string,
        public price: number,
        public description: string,
        public image: string,
        public location: string,
        public deleveryService: boolean,
        public status: boolean,
        public seat: number,
        public door: number,
    ){}
}






