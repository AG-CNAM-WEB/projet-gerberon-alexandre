import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteFormComponent } from './carte-form.component';

describe('CarteFormComponent', () => {
  let component: CarteFormComponent;
  let fixture: ComponentFixture<CarteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
