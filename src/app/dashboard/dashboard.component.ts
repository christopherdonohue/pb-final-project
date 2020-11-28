import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MethodCall } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { AuthService } from '../auth/auth.service';



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





  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

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
        this.dataSource.datasets[0].data[i] = res.data[i].budgetVal;
        this.dataSource.datasets[0].backgroundColor[i] = res.data[i].color;
        this.dataSource.labels[i] = res.data[i].title;
    }
      this.createPieChart();
      this.createBarChart();
      this.createPolarAreaChart();
      });


  }


  createPieChart() {
    const canvas = document.getElementById('myPieChart') as HTMLCanvasElement;
    const ctx: any = canvas.getContext('2d');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource,
    });
  }
  createBarChart() {
    const canvas = document.getElementById('myBarChart') as HTMLCanvasElement;
    const ctx: any = canvas.getContext('2d');
    const myBarChart = new Chart(ctx, {
        type: 'bar',
        data: this.dataSource
    });
  }
  createPolarAreaChart() {
    const canvas = document.getElementById('myPolarAreaChart') as HTMLCanvasElement;
    const ctx: any = canvas.getContext('2d');
    const myLineChart = new Chart(ctx, {
        type: 'polarArea',
        data: this.dataSource
    });
  }



}


