import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Campaign } from 'src/app/core/interfaces/campaign.interface';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CreatecampaignComponent } from '../../components/createcampaign/createcampaign/createcampaign.component';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm/modal-confirm.component';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {

  isLoading: boolean = false;
  campaigns: Campaign[] = [];
  displayedColumns: string[] = ['code', 'name', 'startDate', 'endDate', 'actions'];
  dataSource!: MatTableDataSource<Campaign>;
  searchDate!: Date;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;

  constructor(public campaignService: CampaignService, public authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCampaigns();
  }

  getCampaigns() {
    this.isLoading = true;
    this.campaignService.getCampaigns().subscribe((res: Campaign[]) => {
      console.log(res);
      this.isLoading = false;
      this.campaigns = res;
      this.dataSource = new MatTableDataSource(this.campaigns);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err) => {
      console.log(err);
    });
  }

  onCreateClick() {
    const dialogRef = this.dialog.open(CreatecampaignComponent, {
      data: { edit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getCampaigns();
      }
    });
  }

  onDeleteClick(campaign: Campaign) {
    console.log(campaign);
    const dialogRef = this.dialog.open(ModalConfirmComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.campaignService.deleteCampaign(campaign.id).subscribe((res) => {
          console.log(res);
          this.getCampaigns();
        });
        this.getCampaigns();
      }
    });

  }

  onEditClick(campaign: Campaign) {
    console.log(campaign);
    const dialogRef = this.dialog.open(CreatecampaignComponent, {
      data: { edit: true, campaign }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getCampaigns();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // applyFilterByDate(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // onFechaChange(): void {
  //   // this.dataSource.filterPredicate = (data: Campaign, filter: string) => moment(data.fechaVisita).format('DD/MM/YYY') == moment(filter).format('DD/MM/YYY');
  //   this.dataSource.filterPredicate = (data: Campaign, filter: string) => data.startDate == new Date(filter) || data.endDate == new Date(filter);
  //   this.dataSource.filter = this.datepicker.value ? this.datepicker.value.toString() : '';
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // applyFilterTPC(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSourceTPC.filterPredicate = (data: any, filter: string) => {
  //     return data.rut.toLowerCase().includes(filter) || data.nombres.toLowerCase().includes(filter) ||
  //       data.apellidoPaterno.toLowerCase().includes(filter) || data.apellidoMaterno.toLowerCase().includes(filter);
  //   };
  //   this.dataSourceTPC.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSourceTPC.paginator) {
  //     this.dataSourceTPC.paginator.firstPage();
  //   }
  // }

  signOut() {
    this.authService.logout();
  }

}
