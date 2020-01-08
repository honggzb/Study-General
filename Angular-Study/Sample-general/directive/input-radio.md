- Pre-select the 1st radio button of the list
- Binding: Model -> Template
- Binding: Template -> Model

```html
<!-- Pre-select the 1st radio button of the list -->
<tr *ngFor="let entry of entries; let idx = index">
    <td><input type="radio" name="radiogroup" [checked]="idx === 0">
</tr>
<!-- Binding: Model -> Template -->
<input type="radio" name="radiogroup" [checked]="idx === 0" [value]="entry.id">
<!-- Binding: Template -> Model -->
<input type="radio" name="radiogroup" [checked]="idx === 0" [value]="entry.id" (change)="onSelectionChange(entry)">
<script>
@Component({...})
class App {
    //...
    selectedEntry;
    onSelectionChange(entry) {
        this.selectedEntry = Object.assign({}, this.selectedEntry, entry);
    }
}
</script>
```
