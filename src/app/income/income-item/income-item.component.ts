import { Component, OnInit, Input } from '@angular/core';
import { Income } from '../income.model';

@Component({
  selector: 'app-income-item',
  templateUrl: './income-item.component.html',
  styleUrls: ['./income-item.component.css']
})
export class IncomeItemComponent implements OnInit {
  @Input() income: Income;

  constructor() { }

  ngOnInit(): void {
  }

}
