import { Component, OnInit } from '@angular/core';
import { Income } from '../income.model';
import { NgForm } from '@angular/forms';
import { IncomeService } from '../income.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-income-edit',
  templateUrl: './income-edit.component.html',
  styleUrls: ['./income-edit.component.css']
})
export class IncomeEditComponent implements OnInit {
  income: Income;
  editMode: boolean = false;
  id: string;
  originalIncome: Income;

  constructor(private incomeService: IncomeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(

      (params: Params) => {

        this.id = params['id'];
        if (!this.id){
          this.editMode = false;
          return;
        }

        this.incomeService.getIncome(this.id)
          .subscribe(
            response => {
              this.originalIncome = response.income;
              if(!this.originalIncome){
                return;
              }

              this.editMode =  true;
              this.income = JSON.parse(JSON.stringify(this.originalIncome));
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
    const newIncome = new Income('', this.id, values.date, values.name, values.amount, values.description, 'income');
    if (this.editMode){
      this.incomeService.updateIncome(this.originalIncome, newIncome)
    } else{
      this.incomeService.addIncome(newIncome);
    }
    this.onCancel();
  }

}
