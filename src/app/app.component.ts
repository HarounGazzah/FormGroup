import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl } from '@angular/forms';

import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registrationForm: FormGroup;

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword:[''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([])
    }, {validator: PasswordValidator});

    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email'); 
        if(checkedValue) {
          email.setValidators(Validators.required);
        }else{
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }
    
  //used for validations to minimise code to replace registrationForm.get('userName') in html
  get userName(){
    return this.registrationForm.get('userName');
  }

  get email(){
    return this.registrationForm.get('email');
  }
  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmails(){
    this.alternateEmails.push(this.fb.control(''));
  }
  constructor(private fb: FormBuilder){}

  // registrationForm = this.fb.group({
  //   userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
  //   email: [''],
  //   subscribe: [false],
  //   password: [''],
  //   confirmPassword:[''],
  //   address: this.fb.group({
  //     city: [''],
  //     state: [],
  //     postalCode: []
  //   })
  // }, {validator: PasswordValidator});
  
  // registrationForm = new FormGroup({
  //   userName: new FormControl('Haroun'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

/*   loadApiData(){
    this.registrationForm.setValue({
      userName:'Haroun',
      password:'1234',
      confirmPassword:'1234',
      address: {
        city:'City',
        state:'state',
        postalCode:'4017'
      }
    })
  } */

  loadApiData(){
    this.registrationForm.patchValue({
      userName:'Haroun',
      password:'1234',
      confirmPassword:'1234',
    })
  }

  onSubmit(){
    console.log(this.registrationForm.value);
  }
}
