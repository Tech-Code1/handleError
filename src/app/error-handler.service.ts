import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AllValidationErrors, FormGroupControls } from './allValidatorsErrors';

interface IErrorsKeys {
  nameError: string;
  textError: string;
}
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  errorInput: string = ""
  inputName: string = ""
  //controls!: FormGroupControls;
  //errorName: AllValidationErrors | undefined | string;
  //error: AllValidationErrors | undefined | string = this.getFormValidationErrors(this.controls).shift()?.error_name;

  constructor() {

  }

  handlerErrorInputs(formName:  FormGroupControls, inputName: string, controlName: string): string {

    const error: any = this.getFormValidationErrors(formName).shift();

    const errorName = error!.error_name
    const control = error?.control_name

    if (control === controlName) {
      const listErrors: any = {
        'required' : `El ${inputName} es requerido.`,
        'minlength' : `El ${inputName} debe de tener mas de 3 caracteres.`,
        'maxlength' : `El ${inputName} es demasiado extenso.`,
        'pattern' : `Se requiere un ${inputName} valido.`,
      }

      this.errorInput =  listErrors[errorName]

      return this.errorInput
    }

    return "Error desconocido"
  }

  getFormValidationErrors(controls: FormGroupControls): AllValidationErrors[] {

    let errors: AllValidationErrors[] = [];

    Object.keys(controls).forEach(key => {
      const control = controls[ key ];
      if (control instanceof FormGroup) {
        errors = errors.concat(this.getFormValidationErrors(control.controls));
      }
      const controlErrors: ValidationErrors | null = controls[ key ].errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors.push({
            control_name: key,
            error_name: keyError,
            error_value: controlErrors[ keyError ]
          });
        });
      }
    });
    return errors;
  }
}
