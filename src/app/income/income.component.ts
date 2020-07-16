import { Component, OnInit } from '@angular/core';
import { Income } from './income.model';
import { IncomeService } from './income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  selectedIncome: Income;

  constructor(private incomeService: IncomeService) { }

  ngOnInit() {
    this.incomeService.incomeSelectedEvent.subscribe(
      (income: Income) => {
        this.selectedIncome = income;
      }
    )
  }

}
