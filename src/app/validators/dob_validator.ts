import { AbstractControl,ValidationErrors } from "@angular/forms";


export function dobValidator(control:AbstractControl): ValidationErrors | null{
const value = control.value; // save the user input
 // If no value is provided, return null to let other validators handle it
if(!value){
    return null;
}


const dob = new Date(value);
console.log('user dob',dob);
const today = new Date(); // get today date


//calc age

const age = today.getFullYear() - dob.getFullYear();
console.log(age); // year diff
const monthDiff = today.getMonth() - dob.getMonth();
console.log(monthDiff);
const dayDiff = today.getDay() - dob.getDay();
console.log(dayDiff);



// check date of dob is in future

const isFuture = dob > today;
console.log("dob > today",isFuture); 

// check user dob is less than 18

const isUnderAge =  age < 18 || (age === 18 && monthDiff < 0) || (age === 18 && monthDiff === 0 && dayDiff < 0);
if (isFuture) {
    return { 'dobInvalid': 'Date of birth cannot be in the future' };
  }
if (isUnderAge) {
    return { 'dobInvalid': 'You must be at least 18 years old' };
  }

  return null;

}