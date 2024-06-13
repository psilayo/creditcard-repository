import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card'; 
import { CreditcardsService } from 'src/app/services/creditcards.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  

  constructor( private creditcardsService: CreditcardsService,
               private router: Router){}

  newCreditCard: CreditCard = {
    id: undefined,
    name: "",
    bankName: "",
    description: "",
    maxCredit: 5000,
    interestRate: 12,
    active: true,
    recommendedScore: 100-500,
    annualFee: 12,
    termsandConditions: "Terms and Condtions for Credit Card",
    createdDate: Date(),
    updatedDate: Date()
  }

  saveCreditCard(){
    console.log("Form Submitted");
    this.creditcardsService.createCreditCard(this.newCreditCard).subscribe(data =>{
      alert("Credit Card Added");
      this.router.navigate(['creditcards']);
    })
  }
  // ngOnDestroy(){
  //   if(this.subscription){
  //     this.subscription.unsubscribe();
  //   }
  // }

}
