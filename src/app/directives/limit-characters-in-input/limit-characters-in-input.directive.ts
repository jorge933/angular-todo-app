import { Directive, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { HOT_TOAST_STYLES } from '@todo-app/constants';

@Directive({
  selector: '[taLimitCharactersInInput],[maxLengthInput]',
})
export class LimitCharactersInInputDirective {
  @Input() formControl: AbstractControl;
  @Input() maxLengthInput: number;

  constructor(private readonly toastService: HotToastService) {}

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((value: string) => {
      const { maxLengthInput: maxLength } = this;
      const charactersExceedingTheMaxLength = value.length > maxLength;

      if (value && charactersExceedingTheMaxLength) {
        const valueSliced = value.slice(0, maxLength);
        this.formControl.setValue(valueSliced);

        this.toastService.error(
          `Task Name Must Be A Maximum Length Of ${maxLength} Characters`,
          { style: HOT_TOAST_STYLES.error, id: 'max-length-toast' }
        );
      }
    });
  }
}
