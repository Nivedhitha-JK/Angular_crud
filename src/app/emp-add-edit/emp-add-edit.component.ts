import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpServiceService } from '../services/emp-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { dobValidator } from '../validators/dob_validator';
@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit{
empForm: FormGroup;
education:string [] = [
  "Matric",
  "Diploma",
  "Intermediate",
  "Graduate",
  "Post graduate"
];
// using@inject we get add emp old data which is passed from app comp
mailPattern:any;
fnPattern:any;

constructor(private _fb: FormBuilder, 
  private _empService : EmpServiceService,
   private _dialogRef:MatDialogRef<EmpAddEditComponent>,
   @Inject(MAT_DIALOG_DATA) public data:any,
  private _coreService:CoreService){

    this.mailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    // this.fnPattern= "^[a-zA-Z0-9]+$";
    this.fnPattern= "^(?=.{5,15}$)(?![_\\.])[a-zA-Z0-9._]+(?<![_\\.])$";
  

  this.empForm = this._fb.group({
    firstName: ['',[Validators.required,Validators.minLength(5),Validators.pattern(this.fnPattern)]],
    lastName:['',[Validators.required,Validators.minLength(3),Validators.pattern(this.fnPattern)]],
    email: ['',[Validators.required,Validators.pattern(this.mailPattern)]],
    dob:['',[Validators.required,dobValidator]],
    gender:['',Validators.required],
    education:['',Validators.required],
    company:['',Validators.required],
    experience:'',
    package:''
  })
}

  ngOnInit(): void {
    this.empForm.patchValue(this.data); //patchvalue - update form data
  }
    // Getter for the dob form control
    get dob() {
      return this.empForm.get('dob');
    }
onFormSubmit(){
  if(this.empForm.valid){
   if(this.data){
    this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
      next:(val:any) =>{
       this._coreService.openSnackBar('Employee Detail updated...!')
       this._dialogRef.close(true);
      },
      error : (err:any) =>{
        console.log(err);
      }
    })
   }
   else{
    this._empService.addEmployee(this.empForm.value).subscribe({
      next:(val:any) =>{
       this._coreService.openSnackBar('Employee Added successfully....!');
       this._dialogRef.close(true);
      },
      error : (err:any) =>{
        console.log(err);
      }
    })
   }
  }
}
}
