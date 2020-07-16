import { Component, OnInit } from '@angular/core';
import { Expense } from '../expense.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {

  expense: Expense;
  id: string;

  constructor(private expenseService: ExpenseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.expenseService.getExpense(this.id)
          .subscribe(
            response => {
              this.expense = response.expense;
            }
          )
      }
    );
  }

  onEditExpense(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete(){
    this.expenseService.deleteExpense(this.expense);
    this.router.navigate(['expenses']);
  }

}
