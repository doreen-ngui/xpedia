$(document).ready(function () {
    const addnewbutton = $("#addnewbookingclass"),
        modal = $("#bookingclassdetailsmodal"),
        filternotifications = $("#filterbookingclassnotifications"),
        namefield = $("#bookingclassdetailsname"),
        savebutton = $("#savebookingclass"),
        detailnotifications = $("#bookingclassdetailsnotifications"),
        idfield = $("#bookingclassid");

    $("input").on("input", function () { detailnotifications.html(""); });

    addnewbutton.on("click", function () {
        idfield.val(0);
        namefield.val("");
        detailnotifications.html("");
        modal.modal("show");
    });

    $(document).on("click", ".editbookingclass", function () {
        const id = $(this).data("id");
        $.getJSON("controllers/bookingclassoperations.php", { getbookingclassdetails: true, BookingClassID: id })
            .done(function (data) {
                idfield.val(data.BookingClassID);
                namefield.val(data.Name);
                detailnotifications.html("");
                modal.modal("show");
            })
            .fail(function (response) { showNotification(filternotifications, "danger", response.responseText); });
    });

    savebutton.on("click", function () {
        const id = idfield.val(), name = namefield.val();
        if (name == "") {
            showNotification(detailnotifications, "info", "Please provide a booking class name first");
            namefield.focus();
            return;
        }
        $.post("controllers/bookingclassoperations.php", { savebookingclass: true, BookingClassID: id, Name: name }, function (data) {
            if (isJSON(data)) {
                data = JSON.parse(data);
                if (data.status == "success") {
                    showNotification(detailnotifications, "success", "The booking class was saved successfully");
                    namefield.val("").focus();
                    $("#searchbookingclasses").click();
                } else if (data.status == "exists") {
                    showNotification(detailnotifications, "info", "That booking class name already exists");
                }
            } else {
                showNotification(detailnotifications, "danger", `Sorry an error occurred ${data}`);
            }
        });
    });

    $("#searchbookingclasses").on("click", function (e) {
        e.preventDefault();
        const name = $("#filterbookingclassname").val();
        $.getJSON("controllers/bookingclassoperations.php", { filterbookingclass: true, Name: name })
            .done(function (data) {
                let rows = "";
                if (data.length > 0) {
                    data.forEach(function (bc, index) {
                        rows += `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${bc.Name}</td>
                                <td><button class="btn btn-sm btn-primary editbookingclass" data-id="${bc.BookingClassID}"><i class="fas fa-edit"></i></button></td>
                            </tr>`;
                    });
                } else {
                    rows = `<tr><td colspan="3" class="text-center">No booking classes found</td></tr>`;
                }
                $("table tbody").html(rows);
            })
            .fail(function (response) { showNotification(filternotifications, "danger", response.responseText); });
    });

    $("#searchbookingclasses").click();
});