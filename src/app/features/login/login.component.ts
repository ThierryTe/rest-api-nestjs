import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppSettings, Settings } from 'src/app/app.settings';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LocationUtils } from 'src/app/shared/utils.functions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formulaire:FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  public settings: Settings;
  loading = false;
  public bgImage:any;
  public passwordHide:boolean = true;
  private returnUrl!: string;
  roles: string[] = [];
  get username(){
    return this.formulaire.get('username');
  }
  get password(){
    return this.formulaire.get('password');
  }
  constructor(public authService:AuthenticationService,public fb:FormBuilder,
    private tokenStorage:TokenStorageService,private _snackBar: MatSnackBar,
    public appSettings:AppSettings,public router:Router,private sanitizer:DomSanitizer,private route: ActivatedRoute) {

    this.settings = this.appSettings.settings; 
    this.formulaire = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password:[null, Validators.required]
    })
   }
   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 25000,
      verticalPosition: "top",
    });
  }


  ngOnInit(): void {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/login.png)');
  
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || environment.FRONTEND_ROUTES.ADMIN;

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

  }

  get f() { return this.formulaire.controls; }

  onSubmit():void{
    if(this.formulaire.valid){
      this.settings.loadingSpinner = true;
      this.authService.login(this.formulaire.value).subscribe(
        data =>{
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.settings.loadingSpinner = false;
          this.router.navigateByUrl(this.returnUrl);
        },
        errorResponse =>{
          this.openSnackBar(errorResponse.error.message,"OK");
          //LocationUtils.notifyRemoteError(errorResponse.error,this._snackBar)
        }
      )
    }
    
  }
 
}
