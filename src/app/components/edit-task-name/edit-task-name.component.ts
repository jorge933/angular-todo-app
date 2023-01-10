import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ta-edit-task-name',
  templateUrl: './edit-task-name.component.html',
  styleUrls: ['./edit-task-name.component.scss'],
})
export class EditTaskNameComponent {
  newNameControl = new FormControl(this.data);
  maxLength = 16;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  get disableCondition() {
    return (
      this.data === this.newNameControl.value ||
      !this.newNameControl.value ||
      this.newNameControl.value.length > this.maxLength
    );
  }
}
