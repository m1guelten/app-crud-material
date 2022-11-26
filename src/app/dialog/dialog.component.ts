import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  productConditionList = ['Новий', 'Б/у', 'Після ремонту'];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    // this.http.readData().subscribe((res) => console.log(res));
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: [this.editData?.name, [Validators.required]],
      category: [this.editData?.category, [Validators.required]],
      productCondition: [
        this.editData?.productCondition,
        [Validators.required],
      ],
      price: [this.editData?.price, [Validators.required]],
      comment: [this.editData?.comment, [Validators.required]],
      date: [this.editData?.date, [Validators.required]],
    });
  }

  addProduct(): void {
    if (this.form.invalid) return;
    this.http.createData(this.form.value).subscribe({
      next: (res) => {
        console.log('Added product', res);
        this.form.reset();
        this.dialogRef.close();
      },
      error: (err) => console.log(err),
    });
  }

  updatedProduct(): void {
    if (this.form.invalid) return;
    this.http.updateData(this.form.value, this.editData.id).subscribe({
      next: (res) => {
        console.log('Updated product', res);
        this.form.reset();
        this.dialogRef.close('updated');
      },
      error: (err) => console.log(err),
    });
  }
}
