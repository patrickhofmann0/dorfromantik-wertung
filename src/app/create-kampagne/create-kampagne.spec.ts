import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKampagne } from './create-kampagne';

describe('CreateKampagne', () => {
  let component: CreateKampagne;
  let fixture: ComponentFixture<CreateKampagne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateKampagne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateKampagne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
