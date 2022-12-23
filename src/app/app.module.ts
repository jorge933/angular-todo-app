import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotToastModule } from '@ngneat/hot-toast';

import { AppComponent } from './app.component';
import { EditTaskNameComponent } from '@todo-app/components';
import { TaskComponent } from '@todo-app/components';
import { ConfirmDeleteTaskComponent } from '@todo-app/components';
import { SettingsComponent } from '@todo-app/components';
import { LimitCharactersInInputDirective } from '@todo-app/directives';
import { CloseDialogIconButtonComponent } from '@todo-app/components';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    EditTaskNameComponent,
    ConfirmDeleteTaskComponent,
    SettingsComponent,
    LimitCharactersInInputDirective,
    CloseDialogIconButtonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    HotToastModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
