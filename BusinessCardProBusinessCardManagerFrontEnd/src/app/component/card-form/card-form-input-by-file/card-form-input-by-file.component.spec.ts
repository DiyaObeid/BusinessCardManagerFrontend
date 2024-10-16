import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFormInputByFileComponent } from './card-form-input-by-file.component';

describe('CardFormInputByFileComponent', () => {
  let component: CardFormInputByFileComponent;
  let fixture: ComponentFixture<CardFormInputByFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFormInputByFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFormInputByFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
