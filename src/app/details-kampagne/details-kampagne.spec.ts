import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsKampagne } from './details-kampagne';

describe('DetailsKampagne', () => {
  let component: DetailsKampagne;
  let fixture: ComponentFixture<DetailsKampagne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsKampagne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsKampagne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
