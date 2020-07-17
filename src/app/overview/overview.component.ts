import { Component, OnInit } from '@angular/core';
import { Income } from '../income/income.model';
import { Expense } from '../expense/expense.model';
import { IncomeService } from '../income/income.service';
import { ExpenseService } from '../expense/expense.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  incomes: Income[];
  expenses: Expense[];
  totalIncome: number;
  totalExpense: number;
  balance: number;


  constructor(private incomeService: IncomeService, private expenseService: ExpenseService, private http: HttpClient) {
    this.incomeService.getIncomes();
  }

  ngOnInit() {
    this.getBalance();
  }

  getBalance(){
    this.http.get<{message: string, incomes: Income[]}>('http://localhost:3000/incomes')
    .subscribe(
      (responseData) =>{
        this.incomes = responseData.incomes;
        this.totalIncome = 0;
        this.incomes.forEach(
          (income) =>{
            this.totalIncome += Number(income.amount);
          });
        this.http.get<{message: string, expenses: Expense[]}>('http://localhost:3000/expenses')
        .subscribe(
          (responseData) => {
            this.expenses = responseData.expenses;
            this.totalExpense = 0
            this.expenses.forEach(
              expense => {
                this.totalExpense += Number(expense.amount);
              });
            this.balance = this.totalIncome - this.totalExpense;
            console.log(this.balance);
          }
        )
      },
      (error: any) => {
        console.log(error);
      }

    );
  }



}
