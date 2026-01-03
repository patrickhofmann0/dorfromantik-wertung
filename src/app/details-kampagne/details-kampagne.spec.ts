import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DetailsKampagne } from './details-kampagne';
import { KampagneService } from '../kampagne-service';
import { Kampagne } from '../model/kampagne';

describe('DetailsKampagne', () => {
  let component: DetailsKampagne;
  let fixture: ComponentFixture<DetailsKampagne>;
  let kampagneService: KampagneService;

  const mockKampagne: Kampagne = {
    id: '123',
    name: 'Test Kampagne',
    spielleiter: 'Test Leiter',
    anzahlSpieler: 4,
    wertungen: [],
    startDate: new Date()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsKampagne, RouterTestingModule, NoopAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '123',
              },
            },
          },
        },
        {
          provide: KampagneService,
          useValue: {
            getKampagneById: vi.fn(() => mockKampagne),
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsKampagne);
    component = fixture.componentInstance;
    kampagneService = TestBed.inject(KampagneService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load kampagne details on init', () => {
    expect(kampagneService.getKampagneById).toHaveBeenCalledWith('123');
    expect(component.kampagne).toEqual(mockKampagne);
  });
});