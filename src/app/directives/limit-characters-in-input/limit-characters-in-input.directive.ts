import { Directive, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Directive({
  selector: '[taLimitCharactersInInput]',
})
export class LimitCharactersInInputDirective {
  @Input() formControl: AbstractControl;
  @Input() maxLengthInput: number;

  constructor(private toastService: HotToastService) {}

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((value: string) => {
      const { maxLengthInput: maxLength } = this;
      const charactersExceedingTheMaxLength = value.length > maxLength;

      if (charactersExceedingTheMaxLength) {
        const valueSliced = value.slice(0, maxLength);
        this.formControl.setValue(valueSliced);

        this.toastService.error(
          `Task Name Must Be A Maximum Length Of ${maxLength} Characters`,
          {
            style: {
              backgroundColor: '#f70d0d',
              color: 'white',
              fontWeight: 500,
            },
          }
        );
      }
    });
  }
}
