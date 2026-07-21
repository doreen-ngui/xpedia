$(document).ready(function () {
    const addnewbutton = $("#addnewbookingtype"),
        modal = $("#bookingtypedetailsmodal"),
        filternotifications = $("#filterbookingtypenotifications"),
        namefield = $("#bookingtypedetailsname"),
        savebutton = $("#savebookingtype"),
        detailnotifications = $("#bookingtypedetailsnotifications"),
        idfield = $("#bookingtypeid");

    $("input").on("input", function () { detailnotifications.html(""); });

    addnewbutton.on("click", function () {
        idfield.val(0);
        namefield.val("");
        detailnotifications.html("");
        modal.modal("show");
    });

    $(document).on("click", ".editbookingtype", function () {
        const id = $(this).data("id");
        $.getJSON("controllers/bookingtypeoperations.php", { getbookingtypedetails: true, BookingTypeID: id })
            .done(function (data) {
                idfield.val(data.BookingTypeID);
                namefield.val(data.Name);
                detailnotifications.html("");
                modal.modal("show");
            })
            .fail(function (response) { showNotification(filternotifications, "danger", response.responseText); });
    });

    savebutton.on("click", function () {
        const id = idfield.val(), name = namefield.val();
        if (name == "") {
            showNotification(detailnotifications, "info", "Please provide a booking type name first");
            namefield.focus();
            return;
        }
        $.post("controllers/bookingtypeoperations.php", { savebookingtype: true, BookingTypeID: id, Name: name }, function (data) {
            if (isJSON(data)) {
                data = JSON.parse(data);
                if (data.status == "success") {
                    showNotification(detailnotifications, "success", "The booking type was saved successfully");
                    namefield.val("").focus();
                    $("#searchbookingtypes").click();
                } else if (data.status == "exists") {
                    showNotification(detailnotifications, "info", "That booking type name already exists");
                }
            } else {
                showNotification(detailnotifications, "danger", `Sorry an error occurred ${data}`);
            }
        });
    });

    $("#searchbookingtypes").on("click", function (e) {
        e.preventDefault();
        const name = $("#filterbookingtypename").val();
        $.getJSON("controllers/bookingtypeoperations.php", { filterbookingtype: true, Name: name })
            .done(function (data) {
                let rows = "";
                if (data.length > 0) {
                    data.forEach(function (bt, index) {
                        rows += `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${bt.Name}</td>
                                <td><button class="btn btn-sm btn-primary editbookingtype" data-id="${bt.BookingTypeID}"><i class="fas fa-edit"></i></button></td>
                            </tr>`;
                    });
                } else {
                    rows = `<tr><td colspan="3" class="text-center">No booking types found</td></tr>`;
                }
                $("table tbody").html(rows);
            })
            .fail(function (response) { showNotification(filternotifications, "danger", response.responseText); });
    });

    $("#searchbookingtypes").click();
});
