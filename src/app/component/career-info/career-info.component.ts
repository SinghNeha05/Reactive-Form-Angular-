import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Validators, FormBuilder, FormGroup, FormArray
} from "@angular/forms";

import CareerInfoDataService from './career-info.data.service';
import { CityModel, CountryModel, StateModel } from './model/place';

@Component({
  selector: 'app-career-info',
  templateUrl: './career-info.component.html',
  styleUrls: ['./career-info.component.css']
})
export class CareerInfoComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  disable = true;
  selectedValue: string;

  submittedValue: any;
  subscription: Subscription;
  checkboxes = [{
    name: 'Mumbai',
    value: 'mumbai'
  }, {
    name: 'Delhi',
    value: 'delhi'
  }, {
    name: 'Chennai',
    value: 'chennai'
  },
  {
    name: 'Bangalore',
    value: 'bangalore'
  }];

  public countries: CountryModel[] = [];
  public states: StateModel[] = [];
  public cities: CityModel[] = [];

  constructor(private careerInfoDataService: CareerInfoDataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      checkboxes: this.formBuilder.array(this.checkboxes.map(x => false)),
      phaseExecutions: this.formBuilder.group({
        PRE: this.formBuilder.array([this.addPhase()])
      }),
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      email: ['', [Validators.required, Validators.email]],
      experience: '',
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      optradio: ['', [Validators.required]],
    });

    const checkboxControl = (this.registerForm.controls.checkboxes as FormArray);
    this.subscription = checkboxControl.valueChanges.subscribe(checkbox => {
      checkboxControl.setValue(
        checkboxControl.value.map((value, i) => value ? this.checkboxes[i].value : false),
        { emitEvent: false }
      );
    });
    this.onGettingCountriesData();
    this.selectedValue = "";
  }
  log() {
    console.log(this.registerForm.invalid);
    const invalid = [];
    const controls = this.registerForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid);
  }

  addPhase() {
    return this.formBuilder.group({
      skillName: [''],
      description: [''],
      skillLevel: [''],
    });
  }

  addMorePhase() {
    this.phaseArray.push(this.addPhase());
  }


  hasPhaseValue1At(index) {
    return (<FormGroup>this.phaseArray.at(index)).get('phaseValue1') ? true : false;
  }

  get phaseArray() {
    const control = <FormArray>(<FormGroup>this.registerForm.get('phaseExecutions')).get('PRE');
    return control;
  }
  /**
   * @description This function is responsible for fetching country data
   * @param event
   */
  handleChange(event) {
    this.onGettingStatesData(event);
  }

  /**
   *  @description This function is responsible for fetching State data
   * @param event
   */
  handleStateChange(event) {
    this.onGettingCitiesData(event);
  }

  /**
   * @name onGettingCountriesData
   * @description responsible for getting countries data
   */
  public onGettingCountriesData(): void {
    this.careerInfoDataService.getCountriesData().subscribe((data: CountryModel[]) => {
      this.countries = data;
    });
  }


  /**
   * \@name onGettingStatesData
   * @description responsible for getting states data
   */
  public onGettingStatesData(countryId): void {
    this.careerInfoDataService.getStatesData(countryId).subscribe((data: StateModel[]) => {
      this.states = data;
    });
  }

  /**
   * @name onGettingCitiesData
   * @description responsible for getting cities data
   */
  public onGettingCitiesData(id): void {
    this.careerInfoDataService.getCitiesData(id).subscribe((data: CityModel[]) => {
      this.cities = data;
    });
  }
  /**
   * @description responsible for enabling input box if yes is selected
   * @param data
   */
  setradio(data) {
    console.log(data);
    if (data === "No")
      this.disable = true;
    else
      this.disable = false;
  }

  /**
   * Thhis function is responsible for submiting the form
   */
  onSubmit() {
    const checkboxControl = (this.registerForm.controls.checkboxes as FormArray);
    const formValue = {
      ...this.registerForm.value,
      checkboxes: checkboxControl.value.filter(value => !!value)
    }
    let res = confirm("Are you sure you want to submit the employee data?");
    if (res) {
      console.log(this.registerForm.value);
      this.registerForm.reset();
    }
  }

}
