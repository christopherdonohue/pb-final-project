import { HttpClient } from '@angular/common/http';
import { MethodCall } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  notify!: string;

   data = [] as any;

  public dataSource = {
    datasets: [
      {
          data: [] as any,
          backgroundColor: [] as any,
      }
  ],
  labels: [] as any
  };

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const key1 = 'added';
      if (params[key1] === 'success') {
        this.notify = 'Budget Successfully Added!';
      }
    });

    this.http.get('http://localhost:5000/api/users/budget')
    .subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i].title);
        console.log(res.data[i].budgetVal);
        console.log(res.data[i].color);
        this.dataSource.datasets[0].data[i] = res.data[i].budgetVal;
        this.dataSource.datasets[0].backgroundColor[i] = res.data[i].color;
        this.dataSource.labels[i] = res.data[i].title;
    }
      this.createChart();
      });


  }

  createChart() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx: any = canvas.getContext('2d');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }
}


