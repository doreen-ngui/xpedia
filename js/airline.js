$(document).ready(function () {
    const addnewbutton = $("#addnewairline"),
        modal = $("#airlinedetailsmodal"),
        filternotifications = $("#filterairlinenotifications"),
        namefield = $("#airlinedetailsname"),
        logofield = $("#airlinedetailslogo"),
        countryselect = $("#airlinedetailscountry"),
        filtercountryselect = $("#filterairlinecountry"),
        savebutton = $("#saveairline"),
        detailnotifications = $("#airlinedetailsnotifications"),
        idfield = $("#airlineid");

    populateSelect(filtercountryselect, "controllers/countryoperations.php", { getcountries: true }, "CountryID", "Name", "all");
    populateSelect(countryselect, "controllers/countryoperations.php", { getcountries: true }, "CountryID", "Name", "choose");

    $("input, select").on("change input", function () { detailnotifications.html(""); });

    addnewbutton.on("click", function () {
        idfield.val(0);
        namefield.val("");
        logofield.val("");
        countryselect.val("");
        detailnotifications.html("");
        modal.modal("show");
    });

    $(document).on("click", ".editairline", function () {
        const airlineid = $(this).data("id");
        $.getJSON("controllers/airlineoperations.php", { getairlinedetails: true, AirlineID: airlineid })
            .done(function (data) {
                idfield.val(data.AirlineID);
                namefield.val(data.Name);
                logofield.val(data.LogoURL);
                countryselect.val(data.CountryID);
                detailnotifications.html("");
                modal.modal("show");
            })
            .fail(function (response) { showNotification(filternotifications, "danger", response.responseText); });
    });

    savebutton.on("click", function () {
        const airlineid = idfield.val(),
            name = namefield.val(),
            logo = logofield.val(),
            countryid = countryselect.val();

        if (name == "") {
            showNotification(detailnotifications, "info", "Please provide airline name first");
            namefield.focus();
        } else if (countryid == "") {
            showNotification(detailnotifications, "info", "Please select country first");
            countryselect.focus();
        } else {
            $.post("controllers/airlineoperations.php",
                { saveairline: true, AirlineID: airlineid, Name: name, LogoURL: logo, CountryID: countryid },
                function (data) {
                    if (isJSON(data)) {
                        data = JSON.parse(data);
                        if (data.status == "success") {
                            showNotification(detailnotifications, "success", "The airline was saved successfully");
                            namefield.val(""); logofield.val("");
                            $("#searchairlines").click();
                        } else if (data.status == "exists") {
                            showNotification(detailnotifications, "info", "That airline name or logo URL already exists");
                        }
                    } else {
                        showNotification(detailnotifications, "danger", `Sorry an error occurred ${data}`);
                    }
                });
        }
    });

    $("#searchairlines").on("click", function (e) {
        e.preventDefault();
        const name = $("#filterairlinename").val(),
            countryname = filtercountryselect.find(":selected").text();

        $.getJSON("controllers/airlineoperations.php", {
            filterairline: true,
            AirlineName: name,
            CountryName: filtercountryselect.val() == "0" ? "" : countryname
        }).done(function (data) {
            let rows = "";
            if (data.length > 0) {
                data.forEach(function (a, index) {
                    rows += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${a.LogoURL ? `<img src="${a.LogoURL}" height="24">` : "-"}</td>
                            <td>${a.AirlineName || a.Name}</td>
                            <td>${a.CountryName}</td>
                            <td><button class="btn btn-sm btn-primary editairline" data-id="${a.AirlineID}"><i class="fas fa-edit"></i></button></td>
                        </tr>`;
                });
            } else {
                rows = `<tr><td colspan="5" class="text-center">No airlines found</td></tr>`;
            }
            $("table tbody").html(rows);
        }).fail(function (response) { showNotification(filternotifications, "danger", response.responseText); });
    });

    $("#searchairlines").click();
});