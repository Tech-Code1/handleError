import {  Component, OnInit, ViewEncapsulation,OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ErrorHandlerService } from './error-handler.service';
import { ValidatorsService } from './validators.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {

  errorNick: string = "";
  newError: string[] = [];
  errorEmail: string = "";

  submitted: boolean = false;

  public stepStyle!: {
    title: string;
    validated: boolean;
    withoutValidating: boolean;
  };

  multiStep: FormGroup = this.formbuild.group({
    nick: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern), Validators.maxLength(100)]],

  })

  constructor(
    private formbuild: FormBuilder,
    private errorHandlerService: ErrorHandlerService,
    private validatorsService: ValidatorsService,) {
  }

  ngOnDestroy(): void {
  }


  isInvalid(inputName: string) {
    return this.multiStep.get(inputName)?.errors
    && this.multiStep.get(inputName)?.touched;
  }

  isValid(inputName: string){
    return this.multiStep.get(inputName)?.valid
  }

  getErrorsNick():string {
    return this.errorHandlerService.handlerErrorInputs(this.multiStep.controls, "apodo", "nick");
  }

  getErrorsEmail():string {
    return (
      this.errorHandlerService.handlerErrorInputs(this.multiStep.controls, "correo", "email")
    )
  }



}
