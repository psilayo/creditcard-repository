import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { pipe } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  editCreditCardForm!: FormGroup;

  creditCardId: number = 0;

  creditCardData: any;

  private destroy$ : Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private creditCardsService: CreditcardsService){
              
          this.editCreditCardForm = this.formBuilder.group({
            id: [this.creditCardId],
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            description: ['', Validators.required],
            bankName: ['', Validators.required],
            maxCredit: ['', Validators.required],
            interestRate: ['', Validators.required],
            active: [false, Validators.required],
            recommendedScore: [null, Validators.required],
            annualFee: ['', Validators.required],
            termsAndConditions: ['', Validators.required],
            createdDate: ['', Validators.required],
            updatedDate: ['', Validators.required]
          });
        }
      ngOnInit(){
        const id = parseInt(this.route.snapshot.paramMap.get("id") || '');
        this.creditCardId = id;

        if(id !== 0){
          this.creditCardsService.getCreditCardById(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data => {
            this.creditCardData = data;
    
            this.editCreditCardForm.patchValue(this.creditCardData);
          });
        }

        // if(id !== 0){
        //   this.creditCardsService.getCreditCards().subscribe(data => {
        //     this.creditCardData = data.find((card:any) => card.id === id);

        //   this.editCreditCardForm.patchValue(this.creditCardData);
        //   });
        
        // }
      
      
       }

      //  onSubmit(){
      //   if(this.editCreditCardForm.valid){
      //     const updatedFormData: CreditCard = this.editCreditCardForm.value;
      //     console.log(updatedFormData);
      //     this.creditCardsService.updateCreditCard(updatedFormData);
      //   }

      //  }
      onSubmit(){
        console.log("data", this.editCreditCardForm.value);
        if(this.editCreditCardForm.valid){
          const updatedFormData: CreditCard = this.editCreditCardForm.value;
          
          this.creditCardsService.updateCreditCard(updatedFormData)
          .pipe(takeUntil(this.destroy$))
          .subscribe(()=> {
            this.showSuccessMessage("Credit Card Updated Successfully");
          })
        } else {
          console.log("invalid form")
          this.showSuccessMessage("form is invalid");

        }
      }
      showSuccessMessage(message: string){
        this.snackBar.open(message, 'Close', {
          duration: 3000
          
        })
      }
    
      ngOnDestory(){
        this.destroy$.next();
        this.destroy$.complete();
      }
    

}
