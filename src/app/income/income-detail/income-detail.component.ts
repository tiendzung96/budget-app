import { Component, OnInit } from '@angular/core';
import { Income } from '../income.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IncomeService } from '../income.service';

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrls: ['./income-detail.component.css']
})
export class IncomeDetailComponent implements OnInit {

  income: Income;
  id: string;

  constructor(private incomeService: IncomeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.incomeService.getIncome(this.id)
          .subscribe(
            response => {
              this.income = response.income;
            }
          )
      }
    );
  }

  onEditIncome(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete(){
    this.incomeService.deleteIncome(this.income);
    this.router.navigate(['incomes']);
  }

}
