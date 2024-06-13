import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  creditCardDetails!: CreditCard;
  creditCardId: any;

  private destroy$: Subject<void> = new Subject<void>();
   
  constructor(
    private creditCardsService: CreditcardsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {}

    
   ngOnInit(): void {
      //this.creditCardId = +this.router.url.split('/')[3];
      this.creditCardId = this.route.snapshot.paramMap.get('id');
      this.getcreditcard();
    }

    public getcreditcard() {
      this.creditCardsService.getCreditCards()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.showSuccessMessage("Credit Card Loaded Successfully");
        this.creditCardDetails = data.find((card: any) => card.id === +(this.creditCardId));
      });
    }

    showSuccessMessage(message:string){
       this.snackBar.open(message, 'Close', {
        duration: 3000,
       })
    }

    ngOnDestroy(){
      this.destroy$.next();
      this.destroy$.complete();
    }
}
