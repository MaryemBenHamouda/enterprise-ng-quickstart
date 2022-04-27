import {
  Component,
  HostBinding,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
// @ts-ignore
import {
  SohoBarComponent,
  SohoCalendarComponent,
  SohoModalDialogModule,
  SohoModalDialogService,
  SohoToastService,
} from 'ids-enterprise-ng';
import { DayLegendModalComponent } from '../day-legend-Modal/day-legend-Modal.component';

@Component({
  selector: 'app-month',
  templateUrl: 'month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent {
  @ViewChild('dialogPlaceholder', { read: ViewContainerRef, static: true })
  placeholder?: ViewContainerRef;

  @HostBinding('style.overflow') overflow = 'auto';
  @HostBinding('style.height') height = 'auto';
  @HostBinding('style.display') block = 'block';

  @ViewChild(SohoCalendarComponent)
  sohoCalendarComponent?: SohoCalendarComponent;

  public initialMonth = 1;
  public initialYear = 2019;
  public showViewChanger = true;
  public eventTypes?: [];
  public events?: any[];
  public eventsLoaded = false;
  public iconTooltip = 'status';
  public eventTooltip = 'comments';
  public title = 'Day Legend Modal';
  public closeResult = '(N/A)';
  public formDayLegend?: FormGroup;
  public model = {
    start: new Date(),
    end: new Date(),
  };
  showModel = false;
  public dayLegend: any[] = [{ dates: [], color: '#37E8EE' , name:''}];
  dayofweek = [
    { name: 'Monday', value: true },
    { name: 'Tuesday', value: true },
    { name: 'Wednesday', value: true },
    { name: 'Thursday', value: true },
    { name: 'Friday', value: true },
    { name: 'Saturday', value: true },
    { name: 'Sunday', value: true },
  ];
 
  public onCalendarDateSelectedCallback = (
    _node: Node,
    args: SohoCalendarDateSelectedEvent
  ) => {
    console.log('onCalendarEventSelectedCallback', args);
  };

  constructor(
    private toastService: SohoToastService,
    private formBuilder: FormBuilder,
    private modalService: SohoModalDialogService
  ) {
    this.initForm();
    this.addCheckboxes();
  }

  onRenderMonth(event: SohoCalendarRenderMonthEvent) {
    console.log('onRenderMonth', event);
  }

//save to dayLegend and filter daylegend
  save() {
    const startDate = this.formDayLegend?.value.start;
    const endDate = this.formDayLegend?.value.end;
    const selectedays = this.dayofweek.filter((res) => !res.value);
    const dates = this.getDates(new Date(startDate), new Date(endDate));
    const filterbydayofweek = dates.filter((res) => {
      const dayOfWeekName = new Date(res).toLocaleString('en-US', {
        weekday: 'long',
      });
      return selectedays.every((result) => result.name !== dayOfWeekName);
    });
    this.dayLegend[0].dates = filterbydayofweek;
    if (this.sohoCalendarComponent) {
      this.sohoCalendarComponent.dayLegend = this.dayLegend;
    }
  }

  // return dates selection from startdate to enddate
  getDates(startDate: Date, endDate: Date) {
    const date = new Date(startDate.getTime());
    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

//initialization form in input date
  initForm() {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    this.formDayLegend = this.formBuilder.group({
      start: new Date(),
      end: nextDate,
      dayOfWeek: this.formBuilder.array([]),
    });
  }

  onSelected(event: SohoCalendarDateSelectedEvent) {
    console.log('onSelected', event);
    this.openModal();
  }

  onEventClicked(event: SohoCalendarEventClickEvent) {
    this.toastService.show({
      title: 'Calendar Test',
      message: 'Event "' + event?.event?.subject + '" Clicked',
    });
    console.log('onEventClick ', event);
  }

// open daylegend Modal 
  openModal() {
    const dialogRef = this.modalService
      .modal<DayLegendModalComponent>(DayLegendModalComponent, this.placeholder)
      .buttons([
        {
          text: 'Cancel',
          click: () => {
            dialogRef.close();
          },
        },
        {
          text: 'Submit',
          click: () => {
            dialogRef.close();
          },
          isDefault: true,
        },
      ])
      .title(this.title)
      .open()
      .afterClose((result: any) => {
        this.closeResult = result;
      });
  }

  onEventDblClicked(event: SohoCalendarEventClickEvent) {
    this.toastService.show({
      title: 'Calendar Test',
      message: 'Event "' + event?.event?.subject + '" Double Clicked',
    });

    console.log('onEventDblClick', event);
  }

  onCalendarEventContextMenu(event: SohoCalendarEventClickEvent) {
    if (event) {
      this.toastService.show({
        title: 'Calendar Test',
        message: 'Event "' + event?.event?.subject + '" ContextMenu',
      });
      console.log('onEventContextMenu', event);
    }
  }

  public onRenderMonthCallback = (_node: Node, response: Function) => {
    
  };

//if we activate or deactivate the checkboxes we update the values of the dayofweek
  onChange(index: number, value: boolean) {
    this.dayofweek = this.dayofweek.map((dow, i) =>
      i === index ? { ...dow, value } : dow
    );
  }
  // initialization of checkboxes 
  addCheckboxes() {
    this.dayofweek.forEach((res) =>
      this.dayofweekFormArray.push(
        new FormControl({ value: true, disabled: false })
        
      )
    );
  }
  //get dayofweekFormArray
  get dayofweekFormArray() {
    return this.formDayLegend?.controls.dayOfWeek as FormArray;
  }
}
