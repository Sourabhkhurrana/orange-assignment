import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  title = 'orange';
  allColumns: any = [];
  private form: FormGroup;

  private file1Data = [{ column_name: 'Aman', id: 1 }, { column_name: 'sdsaa', id: 2 }, { column_name: 'sdsdfsf', id: 3 }, { column_name: 'dssss', id: 4 }];
  private file2Data = [{ column_name: 'Sourabh', id: 101 }, { column_name: 'Sourabh', id: 111 }, { column_name: 'Sourabh', id: 112 }, { column_name: 'Sourabh', id: 113 }, { column_name: 'Sourabh', id: 114 }, { column_name: 'Sourabh', id: 115 }];

  constructor(private service: AppService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.service.getJson()
    //   .subscribe(res => {
    //     this.allColumns = res;
    //   });

    this.createForm();
    this.fileUpload1(null);
    this.fileUpload2(null);
  }

  createForm() {
    this.form = this.formBuilder.group({
      file1: this.formBuilder.array([]),
      file2: this.formBuilder.array([]),
      added_column: this.formBuilder.array([])
    });
  }

  get file1() {
    return this.form.get('file1') as FormArray;
  }

  get file2() {
    return this.form.get('file2') as FormArray;
  }

  get added_column_as_form_array() {
    return this.form.get('added_column') as FormArray;
  }

  fileAttr() {
    return this.formBuilder.group({
      column_name: ['', Validators.required],
      id: ['', Validators.required],
    });
  }

  async fileUpload1(event) {
    // await this.service.readFile1(event).subscribe((res: any) => {
    //   this.file2Data = res;
    // });

    this.file1Data.forEach(element => {
      this.file1.push(this.fileAttr());
    });

    this.form.controls.file1.patchValue(this.file1Data);
    // this.form.controls.file2.patchValue(this.file2Data);
  }

  async fileUpload2(event) {
    // await this.service.readFile1(event).subscribe((res: any) => {
    //   this.file2Data = res;
    // });

    this.file2Data.forEach(element => {
      this.file2.push(this.fileAttr());
    });

    // this.form.controls.file1.patchValue(this.file1Data);
    this.form.controls.file2.patchValue(this.file2Data);
  }

  addToAdded(value, i, fl) {
    let added = this.form.value.added_column;

    const index = added.findIndex(data => data.id === value.id);

    if (index > -1) {
      return;
    }

    this.added_column_as_form_array.push(this.fileAttr());
    added.push(value);

    this.added_column_as_form_array.patchValue(added);
  }

  removeFromAdded(value, index) {
    value.added = false;
    this.added_column_as_form_array.removeAt(index);
  }

  onFormSubmit() {
    const columns = this.form.value['added_column'];
    this.service.submitColumns(columns)
      .subscribe(res => {
        console.log(res);
      });
  }
}
