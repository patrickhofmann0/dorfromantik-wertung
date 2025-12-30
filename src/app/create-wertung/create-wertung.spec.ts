import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWertung } from './create-wertung';

describe('CreateWertung', () => {
  let component: CreateWertung;
  let fixture: ComponentFixture<CreateWertung>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWertung]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWertung);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
