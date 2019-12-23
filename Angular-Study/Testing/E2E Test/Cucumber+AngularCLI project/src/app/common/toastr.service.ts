import { Injectable } from '@angular/core';

declare let toastr: any

@Injectable()
export class ToastrService {
    Success(message: string) {
        toastr.success(message);
        toastr.options.closeButton = true;
        toastr.options.closeMethod = 'fadeOut';
        toastr.options.closeDuration = 300;
        toastr.options.closeEasing = 'swing';
    }

    Error(message: string) {
        toastr.error(message);
    }
}
