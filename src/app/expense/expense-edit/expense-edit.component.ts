import { Component, OnInit } from '@angular/core';
import { Expense } from '../expense.model';
import { NgForm } from '@angular/forms';
import { ExpenseService } from '../expense.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.css']
})
export class ExpenseEditComponent implements OnInit {
  expense: Expense;
  editMode: boolean = false;
  id: string;
  originalExpense: Expense;

  constructor(private expenseService: ExpenseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(

      (params: Params) => {

        this.id = params['id'];
        if (!this.id){
          this.editMode = false;
          return;
        }

        this.expenseService.getExpense(this.id)
          .subscribe(
            response => {
              this.originalExpense = response.expense;
              if(!this.originalExpense){
                return;
              }

              this.editMode =  true;
              this.expense = JSON.parse(JSON.stringify(this.originalExpense));
            }
          );
      }
    );
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onSubmit(form: NgForm){
    const values = form.value;
    const newExpense = new Expense('', this.id, values.date, values.name, values.amount, values.description, 'expense');
    if (this.editMode){
      this.expenseService.updateExpense(this.originalExpense, newExpense)
    } else{
      this.expenseService.addExpense(newExpense);
    }
    this.onCancel();
  }

}
