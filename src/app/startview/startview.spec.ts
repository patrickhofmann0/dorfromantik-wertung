import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Startview } from './startview';

describe('Startview', () => {
  let component: Startview;
  let fixture: ComponentFixture<Startview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Startview, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Startview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render action buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('Neue Kampagne anlegen');
    expect(buttons[1].textContent).toContain('Zu meinen Kampagnen');
  });
});