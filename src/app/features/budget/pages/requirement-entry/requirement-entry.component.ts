import { MobileFormatPipe } from './../../../../shared/pipes/mobile-format.pipe';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Requirement } from '../../../models/requirement';
import { RequirementService } from '../../services/requirement.service';

@Component({
  selector: 'app-requirement-entry',
  standalone: true,
  imports: [MobileFormatPipe],
  templateUrl: './requirement-entry.component.html',
  styleUrl: './requirement-entry.component.css',
})
export class RequirementEntryComponent {
  reqService = inject(RequirementService);

  reqs: Requirement[] = [];

  constructor() {
    this.reqService.list().subscribe((data) => (this.reqs = data));
    //get<Requirement[]> -> get นี้จะมีtypeเป็น requirement
  }
}
