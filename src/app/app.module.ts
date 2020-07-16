import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { OverviewComponent } from './overview/overview.component';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeListComponent } from './income/income-list/income-list.component';
import { IncomeItemComponent } from './income/income-item/income-item.component';
import { IncomeDetailComponent } from './income/income-detail/income-detail.component';
import { ExpenseDetailComponent } from './expense/expense-detail/expense-detail.component';
import { ExpenseListComponent } from './expense/expense-list/expense-list.component';
import { ExpenseItemComponent } from './expense/expense-item/expense-item.component';
import { IncomeEditComponent } from './income/income-edit/income-edit.component';
import { ExpenseEditComponent } from './expense/expense-edit/expense-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OverviewComponent,
    IncomeComponent,
    ExpenseComponent,
    IncomeListComponent,
    IncomeItemComponent,
    IncomeDetailComponent,
    ExpenseDetailComponent,
    ExpenseListComponent,
    ExpenseItemComponent,
    IncomeEditComponent,
    ExpenseEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
