import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Settings } from 'app/models/settings.model';

@Component({
  selector: 'ta-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  slideToggleControl = new FormControl(false);

  constructor(@Inject(MAT_DIALOG_DATA) public settings: Settings) {}

  ngOnInit(): void {
    const slideToggleControl = this.slideToggleControl;
    slideToggleControl.setValue(this.settings.deleteCompletedTasks);

    slideToggleControl.valueChanges.subscribe((boolean) => {
      this.settings.deleteCompletedTasks = !!boolean;
    });
  }
}
