import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/models/Food';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'chart-food',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './chart-food.component.html',
  styleUrls: ['./chart-food.component.css'],
})
export class ChartFoodComponent implements OnInit {
  foods: Food[] = [];
  chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor(
    private foodService: FoodService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: 'Price',
          data: [],
        },
        // {
        //   name: 'Value',
        //   data: [4, 7, 67],
        // },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        } as any,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        type: 'category',
        categories: [],
      },
      yaxis: {
        title: {
          text: 'Price ($)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + ' $';
          },
        },
      },
      legend: {
        show: true,
        position: 'top',
      },
    };

    this.foodService.getAllFoods().subscribe((foods) => {
      this.foods = foods;
      this.updateChartData();
    });
    this.chart.updateOptions(this.chartOptions);
  }

  updateChartData(): void {
    if (!this.foods.length) {
      return;
    }

    const dataPrice = this.foods.map((food) => food.price);
    const dataName = this.foods.map((food) => food.name);

    if (this.chartOptions.series) {
      this.chartOptions.series[0].data = dataPrice;
    }

    this.chartOptions.xaxis = {
      ...this.chartOptions.xaxis,
      categories: [...dataName],
    };
    this.cdr.detectChanges();
    console.log(
      'Updated X Axis Categories:',
      this.chartOptions.xaxis.categories
    );

    if (this.chart) {
      this.chart.updateOptions(this.chartOptions);
    }
  }
}
