import { Injectable, EventEmitter } from '@angular/core';
import { Income } from './income.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private incomes: Income[] = [];
  incomeSelectedEvent = new EventEmitter<Income>();
  incomeChangedEvent = new EventEmitter<Income[]>();
  incomeListChangedEvent = new Subject<Income[]>();
  maxIncomeId: number;
  incomeTotal: number;


  constructor(private http: HttpClient) { }

  sortAndSend(){
    this.incomes.sort((a, b) => a.date > b.date ? 1 : b.date < a.date ? -1 : 0);
    this.incomeListChangedEvent.next(this.incomes.slice());
  }

  storeIncomes(){
    let incomes = JSON.stringify(this.incomes);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('http://localhost:3000/incomes', incomes, { headers: headers })
    .subscribe(
      () =>{
        this.incomeListChangedEvent.next(this.incomes.slice());
      }
    );
  }

  getIncome(id: string){
    return this.http.get<{ message: string, income: Income }>('http://localhost:3000/incomes/' + id);
  }

  getIncomes(){
    this.http.get<{message: string, incomes: Income[]}>('http://localhost:3000/incomes')
    .subscribe(
      (responseData) =>{
        this.incomes = responseData.incomes;
        this.sortAndSend();
      },
      (error: any) => {
        console.log(error);
      }

    );
  }

  addIncome(income: Income){
    if (!income) {
      return;
    }

    //make sure id of the new income is empty
    income.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    //add to database
    this.http.post<{message: string, income: Income}>('http://localhost:3000/incomes', income, { headers: headers })
    .subscribe(
      (responseData) => {
        //add new income to incomes
        console.log(responseData.income)
        this.incomes.push(responseData.income);
        this.sortAndSend();
      }
    )
  }

  updateIncome(originalIncome: Income, newIncome: Income){
    if (!originalIncome || !newIncome){
      return;
    }

    const pos = this.incomes.findIndex(c => c.id === originalIncome.id);
    if (pos < 0){
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    newIncome.id = originalIncome.id;

    this.http.put('http://localhost:3000/incomes/' + originalIncome.id, newIncome, {headers: headers})
      .subscribe(
        (response: Response) => {
          this.incomes[pos] = newIncome;
          this.sortAndSend();
        }
      );
  }

  deleteIncome(income: Income){
    if (!income){
      return;
    }

    const pos = this.incomes.findIndex(c => c.id === income.id);
    if (pos < 0){
      return;
    }

    //delete from database
    this.http.delete('http://localhost:3000/incomes/' + income.id)
      .subscribe(
        (response: Response) => {
          this.incomes.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  getMaxId(): number{
    let maxId = 0;
    this.incomes.forEach(income => {
      let currentId = parseInt(income.id);
      if (currentId > maxId){
        maxId = currentId;
      }
    });
    return maxId;
  }

}
