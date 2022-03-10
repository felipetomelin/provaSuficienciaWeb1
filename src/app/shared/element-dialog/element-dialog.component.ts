import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {

  element!: Employee;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: Employee,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if(this.data.id != null){
      this.isChange = true;
    }else {
      this.isChange = false;
    }
  }

}
