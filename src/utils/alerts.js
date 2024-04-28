import Swal from 'sweetalert2';

export const showNotification = ({ icon, title, message: text }) => {
  const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    width: '400px',
  });

  toast.fire({
    icon,
    text,
  });
};

