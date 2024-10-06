import Swal from "sweetalert2";

export const showConfirm = (title: string) => {
    Swal.fire({
        title: title,
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
        background: 'black',
        color: 'lightGrey'
    });
};
