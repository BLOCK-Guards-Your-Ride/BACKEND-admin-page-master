import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { CountdownModule } from 'ngx-countdown';
import { SharedModule } from '../shared/shared.module';
import appConfig from './app-config';
import { paginationLocalizer } from './classes/app.paginator-localization';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AuthService } from './services/auth.service';
import { CommonService } from './services/common.service';
import { BASE_API_HREF } from './tokens/api.token';
import { APP_CONFIG } from './tokens/app-config.token';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    RouterModule,
    CountdownModule,
  ],
  providers: [
    AuthService,
    CookieService,
    CommonService,
    { provide: APP_CONFIG, useValue: appConfig },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: BASE_API_HREF, useValue: 'rest' },
    { provide: MatPaginatorIntl, useFactory: paginationLocalizer, deps: [TranslateService] },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: appConfig.snackBarConfig },
  ],
  exports: [HeaderComponent, MenuComponent],
})
export class CoreModule {}
