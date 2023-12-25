import { routes } from './../../../../app.routes';
import { RequirementService } from './../../services/requirement.service';
import { CommonModule, JsonPipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

function isTHMobile(mobileNo: string): boolean {
  return /^(06|08|09)/.test(mobileNo);
}

const thMobile = (c: AbstractControl): ValidationErrors | null => {
  return isTHMobile(c.getRawValue()) ? null : { thMobile: true };
};

@Component({
  selector: 'app-requirement-form',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './requirement-form.component.html',
  styleUrl: './requirement-form.component.css',
})
export default class RequirementFormComponent {
  //form builder
  fb = inject(NonNullableFormBuilder);

  route = inject(ActivatedRoute);
  // title = new FormControl<string>('',{nonNullable: true})
  title = this.fb.control<string>('', { validators: Validators.required });

  contactMobileNo = this.fb.control<string>('', {
    validators: [Validators.required, thMobile, Validators.maxLength(10)],
  }); //array can validator more than 1

  //requirmentService
  reqService = inject(RequirementService);

  //Location from common
  location = inject(Location);
  //formgroup
  //{ title:String , contactMobileNo: String}
  fg = this.fb.group({
    title: this.title,
    contactMobileNo: this.contactMobileNo,
  });

  id: number | null = null;

  constructor() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    // id is has value => edit mode
    if (this.id) {
      // get detail to formGroup
      this.reqService.get(this.id).subscribe((req) => this.fg.patchValue(req));
    }
  }

  onSubmit(): void {
    const submitReq = this.fg.getRawValue();
    if (this.id) {
      this.reqService.edit(submitReq, this.id).subscribe(() => this.onBack());
    } else {
      this.reqService.add(submitReq).subscribe(() => this.onBack());
    }
  }

  onBack(): void {
    this.location.back();
  }
}
