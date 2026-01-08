import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListKampagne } from './list-kampagne';

describe('ListKampagne', () => {
  let component: ListKampagne;
  let fixture: ComponentFixture<ListKampagne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListKampagne, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListKampagne);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load kampagnen on init', () => {
    expect(component.kampagnenList).toBeDefined();
    expect(component.kampagnenList.length).toBeGreaterThanOrEqual(0);
  });
});
