import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormCitasComponent } from './form-citas.component';

describe('FormCitasComponent', () => {
  let component: FormCitasComponent;
  let fixture: ComponentFixture<FormCitasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormCitasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
