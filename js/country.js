$(document).ready(function () {
    const addnewbutton = $("#addnewcountry"),
        countrydetailsmodal = $("#countrydetailsmodal"),
        filternotifications = $("#filtercountrynotifications"),
        countrynamefield = $("#countrydetailsname"),
        savebutton = $("#savecountry"),
        detailnotifications = $("#countrydetailsnotifications"),
        countryidfield = $("#countryid");

    $("input").on("input", function () { detailnotifications.html(""); });

    addnewbutton.on("click", function () {
        countryidfield.val(0);
        countrynamefield.val("");
        detailnotifications.html("");
        countrydetailsmodal.modal("show");
    });

    $(document).on("click", ".editcountry", function () {
        const countryid = $(this).data("id");
        $.getJSON("controllers/countryoperations.php", { getcountrydetails: true, CountryID: countryid })
            .done(function (data) {
                countryidfield.val(data.CountryID);
                countrynamefield.val(data.Name);
                detailnotifications.html("");
                countrydetailsmodal.modal("show");
            })
            .fail(function (response) { showNotification(filternotifications, "danger", response.responseText); });
    });

    savebutton.on("click", function () {
        const countryid = countryidfield.val(),
            countryname = countrynamefield.val();

        if (countryname == "") {
            showNotification(detailnotifications, "info", "Please provide country name first");
            countrynamefield.focus();
            return;
        }

        $.post("controllers/countryoperations.php", { savecountry: true, CountryID: countryid, Name: countryname }, function (data) {
            if (isJSON(data)) {
                data = JSON.parse(data);
                if (data.status == "success") {
                    showNotification(detailnotifications, "success", "The country was saved successfully");
                    countrynamefield.val("").focus();
                    $("#searchcountries").click();
                } else if (data.status == "exists") {
                    showNotification(detailnotifications, "info", "The country name already exists");
                    countrynamefield.focus();
                }
            } else {
                showNotification(detailnotifications, "danger", `Sorry an error occurred ${data}`);
            }
        });
    });

    $("#searchcountries").on("click", function (e) {
        e.preventDefault();
        const countryname = $("#filtercountryname").val();
        $.getJSON("controllers/countryoperations.php", { filtercountry: true, Name: countryname })
            .done(function (data) {
                let rows = "";
                if (data.length > 0) {
                    data.forEach(function (c, index) {
                        rows += `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${c.Name}</td>
                                <td><button class="btn btn-sm btn-primary editcountry" data-id="${c.CountryID}"><i class="fas fa-edit"></i></button></td>
                            </tr>`;
                    });
                } else {
                    rows = `<tr><td colspan="3" class="text-center">No countries found</td></tr>`;
                }
                $("table tbody").html(rows);
            })
            .fail(function (response) { showNotification(filternotifications, "danger", response.responseText); });
    });

    $("#searchcountries").click();
});