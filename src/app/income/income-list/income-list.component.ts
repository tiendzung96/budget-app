import { Component, OnInit, OnDestroy } from '@angular/core';
import { Income } from '../income.model';
import { Subscription } from 'rxjs';
import { IncomeService } from '../income.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit, OnDestroy {
  incomes: Income[] = [];
  subscription: Subscription;
  totalIncome: number = 0;


  constructor(private incomeService: IncomeService, private router: Router, private route: ActivatedRoute ) {
    this.incomeService.getIncomes();
    // this.totalIncome = this.incomeService.getTotalIncome();
  }

  ngOnInit() {
    this.incomeService.incomeChangedEvent.subscribe((incomes: Income[]) =>{
      this.incomes = incomes;

    })
    this.subscription = this.incomeService.incomeListChangedEvent.subscribe((incomeList: Income[]) => {
      this.incomes = incomeList;
    });

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onNewIncome(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}