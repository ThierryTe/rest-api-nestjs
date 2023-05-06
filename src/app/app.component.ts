import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Settings, AppSettings } from './app.settings';
import { Router, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'location-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public settings: Settings;
  title = 'location admin';

  constructor(public appSettings:AppSettings, 
              public router:Router,
              @Inject(PLATFORM_ID) private platformId: Object,
              public translate: TranslateService){
    this.settings = this.appSettings.settings;
    translate.addLangs(['en','de','fr','ru','tr']);
    translate.setDefaultLang('fr'); 
    translate.use('fr');
  }


  ngOnInit() {
    this.router.events.subscribe(event => {

      if(event instanceof NavigationStart) {
       // console.log(" NavigationStart "+event.url)          
        setTimeout(() => { 
          this.settings.progressBar = true;
        });
      }else if(event instanceof NavigationEnd) {
       //console.log(" NavigationEnd "+event.url)
       setTimeout(() => { 
        this.settings.progressBar = false; 
      });
      }else if(event instanceof NavigationCancel) {
       // console.log(" NavigationCancel "+event.url)
       setTimeout(() => { 
        this.settings.progressBar = false;
      });
      }else {
        //console.log(" outer.events ",event)
      }
  

    });


   }





 /*  ngAfterViewInit(){ 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {   
        setTimeout(() => {
          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0,0);
          }
        }); 
      }            
    });    
  } */

}
