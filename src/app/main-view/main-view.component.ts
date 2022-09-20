import { Component, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  constructor(private mainService: MainService) { }


  base: any;
  date: any;
  hashMapRate = new Map();
  selectedFrom = "EUR";
  selectedTo = "ILS";
  amount = 1;
  total = 0;
  strTotal = "";
  historyTable: Array<string> = [];

  ngOnInit(): void {
    this.mainService.getExchangeRates().subscribe(data => {
      this.base = data.base;
      this.date = data.date;
      console.log(data.rates)

      let key = Object.keys(data.rates);

      for (let i = 0; i < key.length; i++) {
        this.hashMapRate.set(key[i], data.rates[key[i]]);
        // console.log(data.rates[key[i]]);
        // console.log(key[i]);
      }
      this.calculate();
    });
    this.getUserHistory();

  }

  selectFrom(ev: any) {

    console.log(ev);
    this.selectedFrom = ev;
    this.calculate();
  }

  selectTo(ev: any) {
    console.log(ev);
    this.selectedTo = ev;
    this.calculate();

  }
  updateAmount(ev: any) {
    this.amount = ev.target.value;
    this.calculate();
  }

  calculate() {
    let selectedFromValue = this.hashMapRate.get(this.selectedFrom);
    let selectedToValue = this.hashMapRate.get(this.selectedTo);
    if (selectedToValue != null && selectedFromValue != null) {
      this.total = ((1 / selectedFromValue) * selectedToValue) * this.amount;
      this.strTotal = this.amount + " " + this.selectedFrom + " = " + this.total + " " + this.selectedTo;
      console.log(this.amount, this.selectedFrom, this.selectedTo, this.strTotal);

      if (this.strTotal != null)
        this.historyTable.push(this.strTotal!);
      localStorage.setItem('historyData', JSON.stringify(this.historyTable));
    }
  }

  getUserHistory() {
    let data = "";
    data = localStorage.getItem('historyData')!;
    // console.log(data);
    if (data != null) {
      this.historyTable = JSON.parse(data);
    }
  }


}

