import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatDialogModule,MatTabsModule,MatProgressBarModule,MatTableModule,MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule,MatFormFieldModule,MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule }     from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppConfig } from './app.config';

import { AuthGuard } from './_guards/auth.guard';
import { AlertService } from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { FamilyTreeService } from './_services/familytree.service';
import { RequestOptionService } from './_services/requestoption.service';

import { AlertComponent } from './components/alert/alert.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FamilytreeComponent } from './components/familytree/familytree.component';
import { HttpModule } from '@angular/http';
import { TreeviewModule } from 'ngx-treeview';
import { AngularFontAwesomeModule } from 'angular-font-awesome'
import { JwtInterceptor } from './_helpers/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,    
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    FamilytreeComponent
  ],
  entryComponents:[],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,MatTabsModule,MatProgressBarModule,MatTableModule, MatInputModule , MatFormFieldModule, MatButtonModule,MatCheckboxModule, BrowserAnimationsModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, LayoutModule, MatToolbarModule, MatSidenavModule, MatListModule, AppRoutingModule,
    AngularFontAwesomeModule ,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    HttpModule,
    TreeviewModule.forRoot(),
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    AppConfig,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    FamilyTreeService,
    RequestOptionService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
