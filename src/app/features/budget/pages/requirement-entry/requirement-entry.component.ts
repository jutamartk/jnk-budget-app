import { RouterLink } from '@angular/router';
import { MobileFormatPipe } from './../../../../shared/pipes/mobile-format.pipe';
import { Component, inject } from '@angular/core';
import { Requirement } from '../../models/requirement';
import { RequirementService } from '../../services/requirement.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-requirement-entry',
  standalone: true,
  //import FormsModule, ReactiveFormsModule
  imports: [RouterLink,MobileFormatPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './requirement-entry.component.html',
  styleUrl: './requirement-entry.component.css',
})
export default class RequirementEntryComponent {

  //injection 
  reqService = inject(RequirementService);

  reqs: Requirement[] = [];

  filtered = this.reqs;

  isSmallTable = true;

  //* new searchBox
  searchBox = new FormControl<string>('', { nonNullable: true });

  
  constructor() {
    this.reqService.list().subscribe(
      (data) => {
        this.reqs = data;
        this.filtered = this.reqs;
      }
      // (this.reqs = data));
      //get<Requirement[]> -> get นี้จะมีtypeเป็น requirement
    );

    this.searchBox.valueChanges
      .pipe(
        //มาจาก import rxjs -> รอระหว่าง search และ console ออกมา
        debounceTime(500),
        distinctUntilChanged(),
        tap((v) => console.log(v))
      )
      .subscribe((keyword) => {
        //ให้ทำอะไร
        this.filtered = this.reqs.filter((req) => req.title.includes(keyword));
      });
  }
}
