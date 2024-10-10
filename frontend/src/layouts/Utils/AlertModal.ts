import Swal from "sweetalert2";

export class AlertModal {


    static showConfirm(title: string) {
        Swal.fire({
            title: title,
            icon: 'success',
            showConfirmButton: false,
            timer: 3000,
            background: 'black',
            color: 'lightGrey'
        })
    }

    static showSessionExpired(title: string, text: string) {
        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showConfirmButton: false,
            timer: 3000,
            background: 'black',
            color: 'lightGrey'
        })
    }

}
