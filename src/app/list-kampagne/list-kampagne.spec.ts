import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKampagne } from './list-kampagne';

describe('ListKampagne', () => {
  let component: ListKampagne;
  let fixture: ComponentFixture<ListKampagne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListKampagne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListKampagne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
