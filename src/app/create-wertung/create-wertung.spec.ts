import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CreateWertung } from './create-wertung';

describe('CreateWertung', () => {
  let component: CreateWertung;
  let fixture: ComponentFixture<CreateWertung>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWertung, RouterTestingModule, NoopAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (id: string) => '123',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateWertung);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with kampagneId from route', () => {
    expect(component.kampagneId).toBe('123');
  });
});