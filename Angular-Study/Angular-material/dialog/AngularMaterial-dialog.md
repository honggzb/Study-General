1. `app.module.ts`

```javascript
/* two components */
import { GeneralDialogComponent } from './general-dialog/general-dialog.component';
import { ExampleDialogComponent } from './example-dialog/example-dialog.component';
@NgModule({
  entryComponents: [ExampleDialogComponent],    /* entryComponents */
})
export class AppModule { }
```

2. `general-dialog` component- general-dialog

**general-dialog.component.html**

```html
<mat-form-field>
    <input matInput [(ngModel)]="name" placeholder="What's your name?">
</mat-form-field>
<button mat-raised-button (click)="openDialog()">Pick one</button>
<p *ngIf="animal"> You chose: <i>{{animal}}</i></p>
```

**general-dialog.component.ts**

```javascript
import {Component} from '@angular/core';
import {MatDialog, MatDialogRef } from '@angular/material';
import { ExampleDialogComponent } from '../example-dialog/example-dialog.component';
@Component({
  selector: 'app-general-dialog',
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.css']
})
export class GeneralDialogComponent {
  animal: string;
  name: string;
  dialogRef: MatDialogRef<ExampleDialogComponent>;

  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    let dialogRef = this.dialog.open(ExampleDialogComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
```

3. `example-dialog` component

**example-dialog.component.html**

```html
<h1 mat-dialog-title>Hi {{data.name}}</h1>
<div mat-dialog-content>
  <p>What's your favorite animal?</p>
  <mat-form-field>
    <input matInput [(ngModel)]="data.animal">
  </mat-form-field>
</div>
<div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">No Thanks</button>
  <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
</div>
```

**example-dialog.component.ts**

```javascript
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-example-dialog',
  templateUrl: './example-dialog.component.html',
  styleUrls: ['./example-dialog.component.css']
})
export class ExampleDialogComponent  {
  constructor(
    public dialogRef: MatDialogRef<ExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
```
