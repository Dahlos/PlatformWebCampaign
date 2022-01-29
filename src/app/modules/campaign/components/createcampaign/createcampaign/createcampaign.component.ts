import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'src/app/core/interfaces/campaign.interface';
import { CampaignService } from '../../../services/campaign.service';

@Component({
  selector: 'app-createcampaign',
  templateUrl: './createcampaign.component.html',
  styleUrls: ['./createcampaign.component.css']
})
export class CreatecampaignComponent implements OnInit {
  campaignForm: FormGroup;
  isEdit: boolean;
  campaign: Campaign;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public formBuilder: FormBuilder, public campaignService: CampaignService) {
    this.isEdit = data.edit;
    this.campaign = data.campaign;
    console.log(this.campaign);
    this.campaignForm = this.buildForm();
  }

  ngOnInit(): void {

  }

  buildForm() {
    return this.campaignForm = this.formBuilder.group({
      code: [this.campaign?.code, Validators.required],
      name: [this.campaign?.name, Validators.required],
      startDate: [this.campaign?.startDate, Validators.required],
      endDate: [this.campaign?.endDate, Validators.required]
    });
  }

  submitForm() {
    if (this.isEdit) {
      this.campaignService.updateCampaign(this.campaign.id, this.campaignForm.value).subscribe((res: any) => {
        console.log(res);
        this.dialogRef.close(true);
      }, (err) => {
        console.log(err);
      });
    } else {
      this.campaignService.createCampaign(this.campaignForm.value).subscribe((res: any) => {
        console.log(res);
        this.dialogRef.close(true);
      }, (err) => {
        console.log(err);
      });
    }
  }

}
