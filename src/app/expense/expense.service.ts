import { Injectable, EventEmitter } from '@angular/core';
import { Expense } from './expense.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [];
  expenseSelectedEvent = new EventEmitter<Expense>();
  expenseChangedEvent = new EventEmitter<Expense[]>();
  expenseListChangedEvent = new Subject<Expense[]>();
  maxExpenseId: number;


  constructor(private http: HttpClient) { }

  sortAndSend(){
    this.expenses.sort((a, b) => a.date > b.date ? 1 : b.date < a.date ? -1 : 0);
    this.expenseListChangedEvent.next(this.expenses.slice());
  }

  storeExpenses(){
    let expenses = JSON.stringify(this.expenses);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('http://localhost:3000/expenses', expenses, { headers: headers })
    .subscribe(
      () =>{
        this.expenseListChangedEvent.next(this.expenses.slice());
      }
    );
  }

  getExpense(id: string){
    return this.http.get<{ message: string, expense: Expense }>('http://localhost:3000/expenses/' + id);
  }

  getExpenses(){
    this.http.get<{message: string, expenses: Expense[]}>('http://localhost:3000/expenses')
    .subscribe(
      (responseData) =>{
        this.expenses = responseData.expenses;
        this.sortAndSend();
      },
      (error: any) => {
        console.log(error);
      }

    );
  }

  addExpense(expense: Expense){
    if (!expense) {
      return;
    }

    //make sure id of the new expense is empty
    expense.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    //add to database
    this.http.post<{message: string, expense: Expense}>('http://localhost:3000/expenses', expense, { headers: headers })
    .subscribe(
      (responseData) => {
        //add new expense to expenses
        console.log(responseData.expense)
        this.expenses.push(responseData.expense);
        this.sortAndSend();
      }
    )
  }

  updateExpense(originalExpense: Expense, newExpense: Expense){
    if (!originalExpense || !newExpense){
      return;
    }

    const pos = this.expenses.findIndex(c => c.id === originalExpense.id);
    if (pos < 0){
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    newExpense.id = originalExpense.id;

    this.http.put('http://localhost:3000/expenses/' + originalExpense.id, newExpense, {headers: headers})
      .subscribe(
        (response: Response) => {
          this.expenses[pos] = newExpense;
          this.sortAndSend();
        }
      );
  }

  deleteExpense(expense: Expense){
    if (!expense){
      return;
    }

    const pos = this.expenses.findIndex(c => c.id === expense.id);
    if (pos < 0){
      return;
    }

    //delete from database
    this.http.delete('http://localhost:3000/expenses/' + expense.id)
      .subscribe(
        (response: Response) => {
          this.expenses.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  getMaxId(): number{
    let maxId = 0;
    this.expenses.forEach(expense => {
      let currentId = parseInt(expense.id);
      if (currentId > maxId){
        maxId = currentId;
      }
    });
    return maxId;
  }

}
