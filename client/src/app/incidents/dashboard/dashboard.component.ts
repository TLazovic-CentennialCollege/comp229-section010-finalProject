import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Incident} from '../../model/incident.model';
import {RestDataSource} from '../../model/rest.datasource';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  incidents: Incident[] = [];
  showAllIncidents = false;

  public booksPerPage = 4;
  public selectedPage = 1;

  constructor(
    // private repository: IncidentRepository,
    private dataSource: RestDataSource
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataSource.getIncidents().subscribe(
      (data) => {
        this.incidents = data;
      }, (error => {
        console.log(error);
      }));
  }

  // get incidents(): Incident[]
  // {
  //   const pageIndex = (this.selectedPage - 1) * this.booksPerPage;
  //   const i = this.repository.getIncidents()
  //     .slice(pageIndex, pageIndex + this.booksPerPage);
  //
  //   return i;
  // }

}
