import { Component, OnInit } from '@angular/core';
import { Expense } from './expense.model';
import { ExpenseService } from './expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  selectedExpense: Expense;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.expenseService.expenseSelectedEvent.subscribe(
      (expense: Expense) => {
        this.selectedExpense = expense;
      }
    )
  }

}
