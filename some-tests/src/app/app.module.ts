import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { RouterLink, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { SignalComponent } from './components/signal/signal.component';
import { TestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExampleComponent } from './components/example/example.component';
import { HttpClientModule } from '@angular/common/http';
import { MapsComponent } from './components/maps/maps.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkDropListGroup, CdkDrag, CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop'

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    ProductsComponent,
    SignalComponent,
    TestComponent,
    ExampleComponent,
    MapsComponent,
    TerminalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
    FormsModule,
    CdkDropListGroup,
    BrowserAnimationsModule,
    CdkDrag,
    CdkDropList
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
