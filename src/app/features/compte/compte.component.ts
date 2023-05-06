import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserElement } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LocationUtils } from 'src/app/shared/utils.functions';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {
  public formulaire!:FormGroup;
  public user:UserElement | any;
  private _onDestroy = new Subject<void>();
  isLoadingResults: boolean | any;
  public hide = true; 
  public bgImage:any;

  constructor(public authenticationService:AuthenticationService,public fb:FormBuilder,
    public route:ActivatedRoute,private router: Router,private _snackBar:MatSnackBar, private sanitizer:DomSanitizer) 
    { 
      this.user = this.route.snapshot.data["user"]
      this.formulaire = this.fb.group({
        id:[null],
        nom: [null, Validators.required],
        prenom: [null, Validators.required],
        username:[null, Validators.required],
        password:[null,Validators.required]
      })
    }
  
  ngOnInit(): void {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/register.png)');
  }


 ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 25000,
      verticalPosition: "top",
    });
  }

  onSubmit() {
    if (this.formulaire.value) {
          this.isLoadingResults=true;
          this.authenticationService.register(this.formulaire.value).subscribe(data =>{
            this.isLoadingResults = false;
            this.openSnackBar("Votre demande de création du compte a été soumise avec succès !","OK");
            this.router.navigate([`${environment.FRONTEND_ROUTES.LOGIN}`])
          },
        errorResponse => {
        this.isLoadingResults = false;
        LocationUtils.notifyRemoteError(errorResponse.error, this._snackBar);
      }
          
      );
      
        (error: any)=>{
          this.isLoadingResults =false;
          let mes= {
            message:"Impossible de valider ce formulaire"
          }
        LocationUtils.notifyRemoteError(mes, this._snackBar)

      }


}
}

public  resetForm(){  
this.router.navigate(['/']);
}



}


