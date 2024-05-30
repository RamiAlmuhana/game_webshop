import { MatSnackBarModule } from '@angular/material/snack-bar';
import {NgModule} from "@angular/core";
import {MessageService} from "primeng/api";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
