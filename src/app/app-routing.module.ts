import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { OverviewComponent } from './overview/overview.component';
import { IncomeComponent } from './income/income.component';
import { IncomeDetailComponent } from './income/income-detail/income-detail.component';
import { IncomeEditComponent } from './income/income-edit/income-edit.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseEditComponent } from './expense/expense-edit/expense-edit.component';
import { ExpenseDetailComponent } from './expense/expense-detail/expense-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent},
  { path: 'incomes', component: IncomeComponent, children: [
      { path: 'new', component: IncomeEditComponent },
      { path: ':id', component: IncomeDetailComponent },
      { path: ':id/edit', component: IncomeEditComponent }
  ]},
  { path: 'expenses', component: ExpenseComponent, children: [
    { path: 'new', component: ExpenseEditComponent },
    { path: ':id', component: ExpenseDetailComponent },
    { path: ':id/edit', component: ExpenseEditComponent }
]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
