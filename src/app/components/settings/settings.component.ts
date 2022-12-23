import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Settings } from 'app/models/settings.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ta-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  settingsObjKeys = Object.keys(this.settings) as Array<keyof Settings>;
  optionsDescription = {
    deleteCompletedTasks: 'Delete completed tasks on init application',
  };
  settings$$ = new BehaviorSubject<Settings>(this.settings);

  constructor(
    @Inject(MAT_DIALOG_DATA) public settings: Settings,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group(this.settings);
    this.settingsForm.valueChanges.subscribe(this.settings$$.next);
  }
}
