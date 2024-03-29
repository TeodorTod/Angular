import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BookService } from './services/book.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';



@NgModule({
  declarations: [
    NavbarComponent,
    MainComponent,
    FooterComponent,
    SidenavComponent,
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    MainComponent,
    FooterComponent,
    SidenavComponent,
    EditDialogComponent
  ],
  providers: [BookService]
})
export class BooksModule { }
