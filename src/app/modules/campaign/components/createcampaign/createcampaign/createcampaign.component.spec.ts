import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'src/app/core/interfaces/campaign.interface';
import { environment } from 'src/environments/environment';
import { CampaignService } from '../../../services/campaign.service';

import { CreatecampaignComponent } from './createcampaign.component';

describe('CreatecampaignComponent', () => {
  let component: CreatecampaignComponent;
  let fixture: ComponentFixture<CreatecampaignComponent>;
  let service: CampaignService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [CreatecampaignComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        CampaignService]
    })
      .compileComponents();
    service = TestBed.inject(CampaignService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('be able to retrieve campaigns from the API bia GET', () => {
    const dummyCampaigns: Campaign[] = [{
      id: "1",
      code: 'CODE 01',
      name: 'CAMPAIGN NAME 01',
      startDate: new Date(),
      endDate: new Date(),
    }, {
      id: "2",
      code: 'CODE 02',
      name: 'CAMPAIGN NAME 02',
      startDate: new Date(),
      endDate: new Date(),
    }];
    service.getCampaigns().subscribe(campaigns => {
      expect(campaigns.length).toBe(2);
      expect(campaigns).toEqual(dummyCampaigns);
    });

    const request = httpMock.expectOne(`${environment.API_URL}/campaigns`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyCampaigns);
  });

  afterEach(() => {
    httpMock.verify();
  });

});
