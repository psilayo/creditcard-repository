import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CreditcardsService } from 'src/app/services/creditcards.service';
import { MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  creditCardId!: number;

  private destory$: Subject<void> = new Subject<void>();

  constructor(private router: ActivatedRoute,
              private route: Router,
              private matSnackBar: MatSnackBar,
              // private location: Location,
              private creditcardsService: CreditcardsService)
              {

            this.creditCardId = +(this.router.snapshot.paramMap.get("id") || '');

            //Delete Functionality
            this.creditcardsService.deleteCreditCard(this.creditCardId)
            .pipe(takeUntil(this.destory$))
            .subscribe(data => {
               this.showSuccessMessage("Credit Card Deleted Successfully"); 
              this.route.navigate(['creditcards']);
            })

        }
        showSuccessMessage(message:string){
          this.matSnackBar.open(message, 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
        ngOnDestroy(){
          this.destory$.next();
          this.destory$.complete();
        }
}
