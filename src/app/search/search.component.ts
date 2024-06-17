import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() searchCriteria = new EventEmitter<any>();
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      year: [null],
      brand: [null],
      model: [null],
      minPrice: [null, Validators.required],
      maxPrice: [null, Validators.required],
    }, { validators: this.priceRangeValidator });
  }

  priceRangeValidator(formGroup: FormGroup): { [key: string]: any } | null {
    const minPrice = formGroup.get('minPrice')?.value;
    const maxPrice = formGroup.get('maxPrice')?.value;

    if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
      formGroup.get('minPrice')?.setErrors({ invalidMinPrice: true });
      formGroup.get('maxPrice')?.setErrors({ invalidMaxPrice: true });
      return { invalidPriceRange: true };
    } else {
      formGroup.get('minPrice')?.setErrors(null);
      formGroup.get('maxPrice')?.setErrors(null);
    }

    return null;
  }

  onMinPriceChange(): void {
    this.searchForm.get('maxPrice')?.updateValueAndValidity();
  }

  onMaxPriceChange(): void {
    this.searchForm.get('minPrice')?.updateValueAndValidity();
  }

  search(): void {
    const criteria = this.searchForm.value;
    console.log('Search Criteria:', criteria);
    this.searchCriteria.emit(criteria);
  }

  resetSearch(): void {
    this.searchForm.reset();
    this.search();
  }
}
