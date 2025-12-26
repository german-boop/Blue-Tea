import swal from "sweetalert";

export const showSwal = (title, icon, button) => {
    return swal({
        title: title,
        icon: icon,
        buttons: button
    })
}

export const manageError = (status) => {
    let message = null
    if (status === 400) message = "Please Fill OUT required Field Correctly";
    else if (status === 401) message = "Unauthorized Request";
    else if (status === 409) message = "This account already existed";
    else if (status === 404) message = "Not Found";
    else if (status === 410) message = " Code Expired";
    else if (status === 422) message = "your Info Not valid";
    else if (status === 500) message = "server Error";
    else message = `unexpected Error (${status})`

    swal({
        title: message,
        icon: "warning",
        buttons: "ok"
    })
    return
}

