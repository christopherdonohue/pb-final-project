import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  data = [] as any;
  notify!: string;

  public dataSource = {
    datasets: [
      {
        data: [] as any,
        data2: [] as any,
        backgroundColor: [] as any,

      },
  ],
  labels: [] as any
  };



  constructor(public auth: AuthService, private router: Router, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const key1 = 'overBudget';
      if (params[key1] === 'true') {
        this.notify = 'You Are Over Budget!';
      }
    });
  }
}



