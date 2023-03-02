import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { DxChartComponent, DxPivotGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(DxPivotGridComponent, { static: false })
  pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent, { static: false }) chart: DxChartComponent;

  dataSource: PivotGridDataSource;
  fieldChooser: object;
  commonSeriesSettings: object;
  size: object;
  adaptiveLayout: object;

  constructor(service: AppService) {
    this.customizeTooltip = this.customizeTooltip.bind(this);
    this.fieldChooser = {
      enabled: true,
    };
    this.commonSeriesSettings = {
      type: 'stackedBar',
    };
    this.size = {
      height: 200,
    };
    this.adaptiveLayout = {
      width: 450,
    };

    this.dataSource = new PivotGridDataSource({
      fields: [
        {
          caption: 'Region',
          width: 120,
          dataField: 'region',
          area: 'row',
        },
        {
          caption: 'City',
          dataField: 'city',
          width: 150,
          area: 'row',
          selector(data: any) {
            return `${data.city} (${data.country})`;
          },
        },
        {
          dataField: 'date',
          dataType: 'date',
          area: 'column',
        },
        {
          caption: 'Sales',
          dataField: 'amount',
          dataType: 'number',
          summaryType: 'sum',
          format: 'currency',
          area: 'data',
        },
        {
          caption: 'My Sales',
          dataType: 'number',
          summaryType: 'sum',
          format: 'currency',
          area: 'data',
          dataField: 'amount',
          calculateSummaryValue: (e: any) => {
            var isGrandTotalCell = !e.parent('row');
            return isGrandTotalCell ? e.value() * 2 : e.value() * 3;
          },
        },
      ],
      store: service.getSales(),
    });
  }

  ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: 'singleAxis',
      alternateDataFields: true,
      putDataFieldsInto: 'args',
      customizeChart: (chartOptions: any) => {
        chartOptions.valueAxis = {
          ...chartOptions.valueAxis,
          visualRange: [null, 3500000],
        };
        return chartOptions;
      },
    });
  }

  customizeTooltip(args: any) {
    return {
      html: `${args.seriesName} | Total<div class='currency'>${args.valueText}</div>`,
    };
  }
}
