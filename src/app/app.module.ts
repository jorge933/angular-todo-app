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

import { AppComponent } from './app.component';
import { EditTaskNameComponent } from './components/edit-task-name/edit-task-name.component';
import { TaskComponent } from './components/task/task.component';
import { ConfirmDeleteTaskComponent } from './components/confirm-delete-task/confirm-delete-task.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LimitCharactersInInputDirective } from './directives/limit-characters-in-input/limit-characters-in-input.directive';
import { HotToastModule } from '@ngneat/hot-toast';
@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    EditTaskNameComponent,
    ConfirmDeleteTaskComponent,
    SettingsComponent,
    LimitCharactersInInputDirective,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
