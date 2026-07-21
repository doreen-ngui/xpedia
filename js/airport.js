$(document).ready(function () {
    const addnewbutton = $("#addnewairport"),
        modal = $("#airportdetailsmodal"),
        filternotifications = $("#filterairportnotifications"),
        namefield = $("#airportdetailsname"),
        codefield = $("#airportdetailscode"),
        cityselect = $("#airportdetailscity"),
        airlineselect = $("#airportdetailsairline"),
        savebutton = $("#saveairport"),
        detailnotifications = $("#airportdetailsnotifications"),
        idfield = $("#airportid");

    populateSelect(cityselect, "controllers/cityoperations.php", { getcities: true }, "CityID", "CityName", "choose");
    populateSelect(airlineselect, "controllers/airlineoperations.php", { getairlines: true }, "AirlineID", "Name", "choose");

    $("input, select").on("change input", function () { detailnotifications.html(""); });

    addnewbutton.on("click", function () {
        idfield.val(0);
        namefield.val(""); codefield.val("");
        cityselect.val(""); airlineselect.val("");
        detailnotifications.html("");
        modal.modal("show");
    });

    $(document).on("click", ".editairport", function () {
        const airportid = $(this).data("id");
        $.getJSON("controllers/airportoperations.php", { getairportdetails: true, AirportID: airportid })
            .done(function (data) {
                idfield.val(data.AirportID);
                namefield.val(data.Name);
                codefield.val(data.AirportCode);
                cityselect.val(data.CityID);
                airlineselect.val(data.AirlineID);
                detailnotifications.html("");
                modal.modal("show");
            })
            .fail(function (response) { showNotification(filternotifications, "danger", response.responseText); });
    });

    savebutton.on("click", function () {
        const airportid = idfield.val(),
            name = namefield.val(),
            code = codefield.val(),
            cityid = cityselect.val(),
            airlineid = airlineselect.val();

        if (name == "") {
            showNotification(detailnotifications, "info", "Please provide airport name first");
            namefield.focus();
        } else if (cityid == "") {
            showNotification(detailnotifications, "info", "Please select city first");
            cityselect.focus();
        } else {
            $.post("controllers/airportoperations.php",
                { saveairport: true, AirportID: airportid, Name: name, AirportCode: code, AirlineID: airlineid, CityID: cityid },
                function (data) {
                    if (isJSON(data)) {
                        data = JSON.parse(data);
                        if (data.status == "success") {
                            showNotification(detailnotifications, "success", "The airport was saved successfully");
                            namefield.val(""); codefield.val("");
                            $("#searchairports").click();
                        } else if (data.status == "exists") {
                            showNotification(detailnotifications, "info", "That airport name or code already exists");
                        }
                    } else {
                        showNotification(detailnotifications, "danger", `Sorry an error occurred ${data}`);
                    }
                });
        }
    });

    $("#searchairports").on("click", function (e) {
        e.preventDefault();
        const cityname = $("#filterairportcity").val(),
            airportname = $("#filterairportname").val();

        $.getJSON("controllers/airportoperations.php", { filterairport: true, CityName: cityname, AirportName: airportname })
            .done(function (data) {
                let rows = "";
                if (data.length > 0) {
                    data.forEach(function (a, index) {
                        rows += `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${a.Name}</td>
                                <td>${a.AirportCode || "-"}</td>
                                <td>${a.cityname || a.CityName}</td>
                                <td>${a.AirlineName || "-"}</td>
                                <td><button class="btn btn-sm btn-primary editairport" data-id="${a.AirportID}"><i class="fas fa-edit"></i></button></td>
                            </tr>`;
                    });
                } else {
                    rows = `<tr><td colspan="6" class="text-center">No airports found</td></tr>`;
                }
                $("table tbody").html(rows);
            })
            .fail(function (response) { showNotification(filternotifications, "danger", response.responseText); });
    });

    $("#searchairports").click();
});
