import { RemoteErrorMessageSnackbarComponent } from './app-toast/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';



export class LocationUtils {



   public static notifyRemoteError(errorData: { message: any; },snackBar: MatSnackBar):void {
    let data = {};
    if (errorData.message) {
       errorData.message;
    } else {
      "L'action n'a pas pu être effectuée";
    }

      snackBar.openFromComponent(RemoteErrorMessageSnackbarComponent, {
        data,
        panelClass: "mat-snack-bar-error-message",
        duration: 25000,
        verticalPosition: "top",
        horizontalPosition: 'center'
  
      });
      
    }
}



export function hasPermission(perms:String[],myRoles: String[]):boolean{

  if(myRoles==null) {
   
  }
 
  let i=0;
  let trouve:boolean=false;
   while(i<perms.length && !trouve){
         trouve=myRoles.indexOf(perms[i])>=0;
        i++;
   }
   return trouve;
}