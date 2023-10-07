import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Car } from 'src/app/models/car.model';
import { CarState } from 'src/app/ngrx/states/car.state';
import * as CarAction from '../../../../ngrx/actions/car.actions';
import { ManufacturerState } from 'src/app/ngrx/states/munufacturer.state';
import * as ManufacturerAction from '../../../../ngrx/actions/manufacturer.actions';
import { categoryState } from 'src/app/ngrx/states/category.state';
import * as CategoryAction from '../../../../ngrx/actions/category.actions';

@Component({
  selector: 'app-carowner',
  templateUrl: './carowner.component.html',
  styleUrls: ['./carowner.component.scss'],
})
export class CarownerComponent implements OnInit, OnDestroy {
  readonly positionOptions = ['Chọn hãng xe', 'HYUNDAI'];
  readonly position = new FormControl(this.positionOptions[0]);

  mauxeOptions = [
    'Chọn mẫu xe',
    'MICRO',
    'SEDAN',
    'SUV',
    'CUV',
    'MPV',
    'HATCHBACK',
  ];
  mauxe = new FormControl(this.mauxeOptions[0]);

  namOptions = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];
  nam = new FormControl(this.namOptions[0]);

  chairOptions = ['2', '4', '5', '7', '8', '9', '10', '11', '12'];
  chair = new FormControl(this.chairOptions[0]);

  doorOptions = ['2', '3', '4', '5'];
  door = new FormControl(this.doorOptions[0]);

  selectedImage: string | ArrayBuffer | null = null;

  addCarForm = new FormGroup({
    carId: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    manufacturerId: new FormControl('', Validators.required),
    ownerId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    seat: new FormControl('', Validators.required),
    door: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private store: Store<{
      car: CarState;
      manufacturer: ManufacturerState;
      category: categoryState;
    }>
  ) {
    this.store.dispatch(ManufacturerAction.get());
    this.store.dispatch(CategoryAction.get());
    this.store.select('manufacturer', 'manufacturers').subscribe((val) => {
      if (val != null && val != undefined) {
        console.log(val);
      }
    });
    this.store.select('category', 'categories').subscribe((val) => {
      if (val != null && val != undefined) {
        console.log(val);
      }
    });
  }
  ngOnDestroy(): void {
    //this.store.dispatch(CarAction.reset());
  }

  ngOnInit(): void {
    this.store.select('car', 'car').subscribe((val) => {
      if (val.carId) {
        this.addCarForm.controls.name.setValue(val.name);
        this.addCarForm.controls.model.setValue(val.model);
        this.addCarForm.controls.price.setValue(String(val.price));
        this.addCarForm.controls.description.setValue(val.description);
        this.addCarForm.controls.location.setValue(val.location);
        this.addCarForm.controls.seat.setValue(String(val.seat));
        this.addCarForm.controls.door.setValue(String(val.door));
        // this.addCarForm.controls.status.setValue(val.status);
        this.addCarForm.controls.image.setValue(val.image);
      }
    }),
      this.store.select('car', 'isAddSuccess').subscribe((val) => {
        if (val) {
          console.log('add success');
        }
      });
  }

  formData: FormData = new FormData();
  file: any;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formData.append('image', file, file.name);
    this.file = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
    console.log(this.file);
  }

  addCar() {
    let addCarData: any = {
      name: this.addCarForm.value.name ?? '',
      model: this.addCarForm.value.model ?? '',
      price: parseInt(this.addCarForm.value.price ?? '0'),
      description: this.addCarForm.value.description ?? '',
      location: this.addCarForm.value.location ?? '',
      seat: parseInt(this.addCarForm.value.seat ?? '0'),
      door: parseInt(this.addCarForm.value.door ?? '0'),
      status: false,
      image: this.addCarForm.value.image ?? '',
      carId: '',
      categoryId: '',
      manufacturerId: '',
      ownerId: '',
      deleveryService: false,
    };

    // this.store.dispatch(CarAction.add({ car: addCarData }));
    console.log(addCarData);
  }
}
