var formSubmitEnter_form = document.getElementsByTagName("form");

var formSubmitEnter_enter = false;
$(window).keydown(function (event) {
    if (event.keyCode == 13) {
        formSubmitEnter_enter = true;
        //  event.preventDefault();
        //  return false;
    } else {
        formSubmitEnter_enter = false;
    }
    return true;
});

$(formSubmitEnter_form).on('submit', function (event) {
    if (formSubmitEnter_enter) {
        var btnPrimary = $("button[type='submit'][form='editForm'].btn-primary");
        if (btnPrimary != undefined && btnPrimary.length == 1) {
            if (btnPrimary[0] != event.originalEvent.submitter)
                event.preventDefault();
            if(btnPrimary[0].checkVisibility())
                btnPrimary[0].form.submit();
        }
        else if ($(event.originalEvent.submitter).hasClass("btn-primary"))
            $(this).trigger(event);
        else {
            btnPrimary = $("button[type='submit'].btn-primary", formSubmitEnter_form);
            //  btnPrimary = $("button[type='submit'].btn-primary");
            if (btnPrimary != undefined && btnPrimary.length == 1)
                btnPrimary[0].form.submit();
            else
                $(this).trigger(event);
        }
    }
});

var formSubmitDelete_btnDanger = $("button[type='submit'][form='editForm'].btn-danger");
var formSubmitDelete_isModalShown = false;
$(formSubmitDelete_btnDanger).on('click', function (event) {
    if (formSubmitEnter_enter)
        return;
    if (!formSubmitDelete_isModalShown) {
        var btn = $(this);
        if (btn.hasClass("popup-confirm")) {    
            event.preventDefault();    
            Swal.fire({
                title: formSubmitDelete_message,
                icon: 'warning',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: formSubmitDelete_confirmButton,
                denyButtonText: formSubmitDelete_cancelButton,
                customClass: {
                    confirmButton: 'btn btn-danger',
                    denyButton: 'btn btn-light'
                },
                buttonsStyling: false,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    formSubmitDelete_isModalShown = true;
                    btn[0].click();
                }
                //else if (result.isDenied) {
                //    
                //}
            });
        }
    }
    //if (confirm("Sei sicuro di voler continuare?"))
    //    $(this).form.submit();
});

async function control_delete_popup(sender = null) {

    const confirm = (await Swal.fire({
        title: formSubmitDelete_message,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: formSubmitDelete_confirmButton,
        denyButtonText: formSubmitDelete_cancelButton,
        customClass: {
            confirmButton: 'btn btn-danger',
            denyButton: 'btn btn-light'
        },
        buttonsStyling: false,
    })).isConfirmed;

    if (sender) {
        if (confirm) sender.submit();
    } else {
        return confirm;
    }
}