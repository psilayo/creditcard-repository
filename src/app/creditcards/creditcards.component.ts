import { Component, ViewChild } from '@angular/core';
import { CreditCard } from '../models/credit-card';
import { MatTableDataSource} from '@angular/material/table';
import { SelectionModel} from '@angular/cdk/collections';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CreditcardsService } from '../services/creditcards.service';
 

@Component({
  selector: 'app-creditcards',
  templateUrl: './creditcards.component.html',
  styleUrls: ['./creditcards.component.css']
})
export class CreditcardsComponent {

  creditcards: CreditCard[] = [];

  creditCardMaximumAmount: number = 0;
  creditCardMaximumInterest: number = 0;

 constructor(private creditcardsService: CreditcardsService){
    this.creditcardsService.getCreditCards().subscribe((data:CreditCard[]) => {
      console.log("dataforCredit", data);
      this.creditcards = data;
    
      this.dataSource = new MatTableDataSource(this.creditcards);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.calculatedMetrics();
    })
  
 }
  dataSource = new MatTableDataSource(this.creditcards);

  displayColumns = ["select", "id", "name", 
   "description", "bankName", "maxCredit", "interestRate", "recommendedScore", "active","actions"];

  selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


    selectHandler(row: CreditCard){
      this.selection.toggle(row as never);
    }

    calculatedMetrics(){
      console.log(this.creditcards)
      this.creditCardMaximumAmount = this.creditcards.filter(card => card.maxCredit > 3000).length;
      this.creditCardMaximumInterest = this.creditcards.filter(card => card.interestRate > 7).length;
   }
}
