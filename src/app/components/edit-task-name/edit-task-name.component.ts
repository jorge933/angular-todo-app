import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ta-edit-task-name',
  templateUrl: './edit-task-name.component.html',
  styleUrls: ['./edit-task-name.component.scss'],
})
export class EditTaskNameComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  newName = new FormControl(this.data);

  preventDefault(event: SubmitEvent) {
    event.preventDefault();
  }
}
