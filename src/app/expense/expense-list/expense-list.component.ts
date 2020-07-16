import { Component, OnInit, OnDestroy } from '@angular/core';
import { Expense } from '../expense.model';
import { Subscription } from 'rxjs';
import { ExpenseService } from '../expense.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit, OnDestroy {
  expenses: Expense[] = [];
  subscription: Subscription;
  totalExpense: number = 0;


  constructor(private expenseService: ExpenseService, private router: Router, private route: ActivatedRoute ) {
    this.expenseService.getExpenses();
    // this.totalExpense = this.expenseService.getTotalExpense();
  }

  ngOnInit() {
    this.expenseService.expenseChangedEvent.subscribe((expenses: Expense[]) =>{
      this.expenses = expenses;
      this.totalExpense = 0;
      this.expenses.forEach(expense => this.totalExpense += Number(expense.amount));
      console.log(this.totalExpense);
    })
    this.subscription = this.expenseService.expenseListChangedEvent.subscribe((expenseList: Expense[]) => {
      this.expenses = expenseList;
      this.totalExpense = 0;
      this.expenses.forEach(expense => this.totalExpense += Number(expense.amount));
      console.log(this.totalExpense);
    });

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onNewExpense(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
