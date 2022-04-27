import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SohoModalDialogService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-day-legend-Modal',
  templateUrl: './day-legend-Modal.component.html',
  styleUrls: ['./day-legend-Modal.component.css']
})
export class DayLegendModalComponent implements OnInit {

  
  public allowClose = true;
  public allowDestroy = true;


  constructor() { }
  public model = {
    
    bool: true,
    header: 'Default Header Text',
    comment: 'This task needs to be escalated to maximum priority and delivered by the end of this week.',
  };

  ngOnInit(): void {
  }
}
