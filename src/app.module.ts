import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http'; // Correctly imported HttpClientModule
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { UserService } from './app/services/user.service'; // Ensure the correct path to the service

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Ensure HttpClientModule is here
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatCardModule,
  ],
  providers: [UserService],  // Provide UserService if not already provided at the root level
  bootstrap: [AppComponent],
})
export class AppModule {}
