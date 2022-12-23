import { Directive, Input } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { HOT_TOAST_STYLES } from '@todo-app/constants';

@Directive({
  selector: '[taLimitCharactersInInput],[maxLengthInput]',
})
export class LimitCharactersInInputDirective {
  @Input() maxLengthInput: number;

  constructor(
    private readonly toastService: HotToastService,
    private readonly ngControl: NgControl
  ) {}

  ngOnInit() {
    const { control } = this.ngControl;
    control!.valueChanges.subscribe((value: string) => {
      if (!value) return;
      const { maxLengthInput: maxLength } = this;
      const charactersExceedingTheMaxLength = value.length > maxLength;

      if (charactersExceedingTheMaxLength) {
        const valueSliced = value.slice(0, maxLength);
        control!.setValue(valueSliced);

        this.toastService.error(
          `Task Name Must Be A Maximum Length Of ${maxLength} Characters`,
          { style: HOT_TOAST_STYLES.error, id: 'max-length-toast' }
        );
      }
    });
  }
}
