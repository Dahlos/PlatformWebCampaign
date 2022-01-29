import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';


import { HomepageComponent } from 'src/app/modules/campaign/pages/homepage/homepage.component';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DATE_FORMATS } from 'src/app/core/constants/DATE_FORMATS';
import { CreatecampaignComponent } from './components/createcampaign/createcampaign/createcampaign.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm/modal-confirm.component';


@NgModule({
    declarations: [
        HomepageComponent,
        CreatecampaignComponent,
        ModalConfirmComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CampaignsRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
    ],
})
export class CampaignModule { }