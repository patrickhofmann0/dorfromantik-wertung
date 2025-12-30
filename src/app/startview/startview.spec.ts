import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Startview } from './startview';

describe('Startview', () => {
  let component: Startview;
  let fixture: ComponentFixture<Startview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Startview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Startview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
