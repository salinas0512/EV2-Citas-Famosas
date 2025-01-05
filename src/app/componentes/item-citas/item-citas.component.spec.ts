import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItemCitasComponent } from './item-citas.component';

describe('ItemCitasComponent', () => {
  let component: ItemCitasComponent;
  let fixture: ComponentFixture<ItemCitasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ItemCitasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
