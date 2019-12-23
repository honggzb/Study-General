import { Component, Input } from '@angular/core';

@Component({
    selector: 'course-thumb',
    template: `
        <div class="card-body">
            <h3 class="card-title" [routerLink]="['/course', course.id]"> {{course.Name}} </h3>
            <hr style="border: .5px solid white;" />
            <p class="card-text"> Release Date: {{course.ReleaseDate}} </p>
            <p class="card-text"> Duration: {{course.Duration}} </p>
            <p class="card-text"> Level: {{course.Level}} </p>
            <p class="card-text" [ngClass]=setProperties() [ngSwitch]="course?.ReleaseDate">
                Event Date: {{course?.ReleaseDate}}
                <span *ngSwitchCase="'9/26/2017'">(4th quater) </span>
                <span *ngSwitchCase="'6/26/2017'">(2nd quater) </span>
                <span *ngSwitchDefault>(Any quater) </span>
            </p>
        </div>
    `
    , styles: [`
        .card-body {
          color: white;
          margin: 10px;
        }
      `
    ]
})
export class CourseThumbnailComponent {
    @Input() course: any
    someproperty: any = "Some value"
    printfoo() {
        console.log("Calling printfoo");
    }

    setProperties() {
        if (this.course && this.course.date === "9/26/2017")
            return ["bold color"]
        return []
    }

    // setNgStyle() {
    //     if (this.course && this.course.location.city === "Chennai")
    //         return { color: "yellow", 'font-weight': "bold" }
    //     return {}
    // }

}
