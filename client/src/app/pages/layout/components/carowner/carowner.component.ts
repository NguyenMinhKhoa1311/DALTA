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
import { Category } from 'src/app/models/category.model';
import { Manufacturer } from 'src/app/models/manufacturer.model';
import { UserState } from 'src/app/ngrx/states/user.state';
import { User } from 'src/app/models/user.model';
import { StorageState } from 'src/app/ngrx/states/storage.state';
import * as StorageAction from '../../../../ngrx/actions/storage.actions';

@Component({
  selector: 'app-carowner',
  templateUrl: './carowner.component.html',
  styleUrls: ['./carowner.component.scss'],
})
export class CarownerComponent implements OnInit, OnDestroy {
  user$ = this.store.select('user', 'user');
  user: User = <User>{};

  fileName: string = '';
  createImageSuccess$ = this.store.select('storage', 'isCreateSuccess');

  namOptions = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];
  nam = new FormControl(this.namOptions[0]);

  chairOptions = ['2', '4', '5', '7', '8', '9', '10', '11', '12'];
  chair = new FormControl(this.chairOptions[0]);

  deleveryServiceOptions = [
    {
      content: 'Yes',
      value: true,
    },
    {
      content: 'No',
      value: false,
    },
  ];

  categories = <Category[]>[];
  manufacturers = <Manufacturer[]>[];

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
    deleveryService: new FormControl('', Validators.required),
  });

  addCarData: any = {
    carId: '',
    categoryId: '',
    manufacturerId: '',
    ownerId: '',
    name: '',
    model: '',
    price: 0,
    description: '',
    location: '',
    seat: 0,
    door: 0,
    status: true,
    image: '',
    deleveryService: false,
  };

  constructor(
    private router: Router,
    private store: Store<{
      car: CarState;
      manufacturer: ManufacturerState;
      category: categoryState;
      user: UserState;
      storage: StorageState;
    }>
  ) {
    this.store.dispatch(ManufacturerAction.get());
    this.store.dispatch(CategoryAction.get());
    this.store.select('manufacturer', 'manufacturers').subscribe((val) => {
      if (val != null && val != undefined) {
        this.manufacturers = val;
      }
    });
    this.store.select('category', 'categories').subscribe((val) => {
      if (val != null && val != undefined) {
        this.categories = val;
      }
    });
    this.user$.subscribe((user) => {
      if (user != <User>{} && user != undefined && user != null) {
        this.user = user;
        console.log(this.user);
      }
    });
    this.createImageSuccess$.subscribe((val) => {
      console.log(val);

      if (val) {
        console.log(val);

        this.store.dispatch(
          StorageAction.get({
            fileName: this.fileName,
          })
        );
      }
    });
    this.store.select('storage').subscribe((val) => {
      if (val.isGetSuccess) {
        this.addCarData.image = val.storage._id;
        this.store.dispatch(CarAction.add({ car: this.addCarData }));
      }
    });
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {}

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
    this.addCarData = {
      carId: this.addCarForm.value.carId,
      categoryId: this.addCarForm.value.categoryId,
      manufacturerId: this.addCarForm.value.manufacturerId,
      ownerId: this.user._id,
      name: this.addCarForm.value.name,
      model: this.addCarForm.value.model,
      price: parseInt(this.addCarForm.value.price || '0'),
      description: this.addCarForm.value.description,
      location: this.addCarForm.value.location,
      seat: parseInt(this.addCarForm.value.seat || '0'),
      door: parseInt(this.addCarForm.value.door || '0'),
      status: true,
      deleveryService: this.addCarForm.value.deleveryService,
    };
    this.fileName =
      this.addCarForm.value.carId + '_' + this.addCarForm.value.name;
    this.store.dispatch(
      StorageAction.create({ file: this.file, fileName: this.fileName })
    );
  }
}
