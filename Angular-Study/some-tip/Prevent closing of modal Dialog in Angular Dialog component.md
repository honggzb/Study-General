- can prevent closing of modal dialog by setting the beforeClose event argument cancel value to true. In the following sample, the dialog is closed when you enter the username value with minimum 4 characters. Otherwise, it will not be closed.

```javascript
import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
    selector: 'app-root',
    template: `
    <button class="e-control e-btn" style="position: absolute;" id="targetButton" (click)="onOpenDialog($event)">Open Dialog</button>
    <div #container class='root-container'>
      <ejs-dialog id='dialog' #ejDialog isModal='true' header='Sign in' (beforeClose)="validation($event)"[buttons]='buttons' [target]='targetElement' width='300px'>
        <ng-template #content>
        <div className="login-form">
          <div class="wrap">
              <div class="e-float-input e-input-group">
                <input id="textvalue" type="text" required (focus)="focusIn($event.target)" (blur)="focusOut($event.target)"/>
                <span class="e-float-line"></span>
                <label class="e-float-text">Username</label>
              </div>
              <div class="e-float-input e-input-group">
                <input id="textvalue2" type="password" required (focus)="focusIn($event.target)" (blur)="focusOut($event.target)"/>
                <span class="e-float-line"></span>
                <label class="e-float-text">Password</label>
              </div>
          </div>
        </div>
        </ng-template>
      </ejs-dialog>
    </div> `
})

export class AppComponent {
    @ViewChild('ejDialog') ejDialog: DialogComponent;
   // The Dialog shows within the target element.
    @ViewChild('container', { read: ElementRef }) container: ElementRef;
    // The Dialog shows within the target element.
    public targetElement: HTMLElement;

    //To get all element of the dialog component after component get initialized.
    ngOnInit() {
      this.initilaizeTarget();
    }

    public focusIn(target: HTMLElement): void {
        let parent: HTMLElement = target.parentElement;
        if (parent.classList.contains('e-input-in-wrap') {
            parent.parentElement.classList.add('e-input-focus');
        } else {
            parent.classList.add('e-input-focus');
        }
    }

    public focusOut(target: HTMLElement): void {
        let parent: HTMLElement = target.parentElement;
        if (parent.classList.contains('e-input-in-wrap') {
            parent.parentElement.classList.remove('e-input-focus');
        } else {
            parent.classList.remove('e-input-focus');
        }
    }
    // Hide the Dialog when click the footer button.
    public hideDialog: EmitType<object> = () => {
        this.ejDialog.hide();
    }
    // Enables the footer buttons
    public buttons: Object = [
        {
            'click': this.hideDialog.bind(this),
            // Accessing button component properties by buttonModel property
              buttonModel:{
              content:'Log in',
              //Enables the primary button
              isPrimary: true
            }
        }
    ];

    // Initialize the Dialog component target element.
    public initilaizeTarget: EmitType<object> = () => {
      this.targetElement = this.container.nativeElement.parentElement;
    }
    public validation (event: any): void {
        let text = document.getElementById('textvalue');
        let text1 = document.getElementById('textvalue2');
        if (text.value === "" && text1.value === "") {
            event.cancel= true;
            alert("Enter the username and password")
        } else if (text.value === "") {
            event.cancel= true;
            alert("Enter the username")
        } else if (text1.value === "") {
            event.cancel= true;
            alert("Enter the password")
        } else if (text.value.length < 4) {
            event.cancel= true;
            alert("Username must be minimum 4 characters")
        } else {
            event.cancel= false;
            document.getElementById("textvalue").value = "";
            document.getElementById("textvalue2").value = "";
        }
    }
    // Sample level code to handle the button click action
    public onOpenDialog = function(event: any): void {
        // Call the show method to open the Dialog
        this.ejDialog.show();
    }
}
```


> [Prevent closing of modal Dialog in Angular Dialog component](https://ej2.syncfusion.com/angular/documentation/dialog/how-to/prevent-closing-of-modal-dialog/#prevent-closing-of-modal-dialog)
