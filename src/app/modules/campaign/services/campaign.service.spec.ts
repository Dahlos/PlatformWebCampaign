import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CampaignService } from './campaign.service';

describe('CampaignService', () => {
  let service: CampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });
    service = TestBed.inject(CampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
