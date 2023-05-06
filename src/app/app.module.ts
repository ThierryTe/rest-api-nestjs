
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { DatePipe } from '@angular/common';

import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

import { environment } from 'src/environments/environment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; 
export function HttpLoaderFactory(httpClient: HttpClient) { 
  return new TranslateHttpLoader(httpClient, environment.url +'/assets/i18n/', '.json');
}
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorI18nService } from './theme/utils/mat-paginator-i18n.service';
import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminModule } from './layout/admin-page/admin.module';
import { LocationRoutingModule } from './location-routing.module';
import { AuthInterceptor, authInterceptorProviders } from './features/login/_helpers/auth.interceptor';
 



@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [  
    BrowserAnimationsModule,
    AdminModule,
    HttpClientModule, 
    NgProgressModule,
    NgProgressHttpModule,
    MatToolbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LocationRoutingModule,
    
  ],
  providers: [ 
    AppSettings,
    authInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DatePipe,
    { provide: MatPaginatorIntl, useClass: MatPaginatorI18nService }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
