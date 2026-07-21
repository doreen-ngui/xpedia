$(document).ready(function () {
    const addnewbutton = $("#addnewroute"),
        modal = $("#routedetailsmodal"),
        filternotifications = $("#filterroutenotifications"),
        namefield = $("#routedetailsname"),
        originselect = $("#routedetailsorigin"),
        destselect = $("#routedetailsdestination"),
        distancefield = $("#routedetailsdistance"),
        durationfield = $("#routedetailsduration"),
        savebutton = $("#saveroute"),
        detailnotifications = $("#routedetailsnotifications"),
        idfield = $("#routeid");

    populateSelect(originselect, "controllers/airportoperations.php", { getairports: true }, "AirportID", "Name", "choose");
    populateSelect(destselect, "controllers/airportoperations.php", { getairports: true }, "AirportID", "Name", "choose");

    $("input, select").on("change input", function () { detailnotifications.html(""); });

    addnewbutton.on("click", function () {
        idfield.val(0);
        namefield.val(""); distancefield.val(""); durationfield.val("");
        originselect.val(""); destselect.val("");
        detailnotifications.html("");
        modal.modal("show");
    });

    $(document).on("click", ".editroute", function () {
        const routeid = $(this).data("id");
        $.getJSON("controllers/routeoperations.php", { getroutedetails: true, RouteID: routeid })
            .done(function (data) {
                idfield.val(data.RouteID);
                namefield.val(data.Name);
                originselect.val(data.OriginalAirportID);
                destselect.val(data.DestinationAirportID);
                distancefield.val(data.Distance);
                durationfield.val(data.EstimatedDuration);
                detailnotifications.html("");
                modal.modal("show");
            })
            .fail(function (response) { showNotification(filternotifications, "danger", response.responseText); });
    });

    savebutton.on("click", function () {
        const routeid = idfield.val(),
            name = namefield.val(),
            origin = originselect.val(),
            dest = destselect.val(),
            distance = distancefield.val(),
            duration = durationfield.val();

        if (name == "") {
            showNotification(detailnotifications, "info", "Please provide a route name first");
            namefield.focus();
        } else if (origin == "" || dest == "") {
            showNotification(detailnotifications, "info", "Please select both origin and destination airports");
        } else {
            $.post("controllers/routeoperations.php",
                {
                    saveroute: true, RouteID: routeid, Name: name,
                    OriginalAirportID: origin, DestinationAirportID: dest,
                    Distance: distance, EstimatedDuration: duration
                },
                function (data) {
                    if (isJSON(data)) {
                        data = JSON.parse(data);
                        if (data.status == "success") {
                            showNotification(detailnotifications, "success", "The route was saved successfully");
                            namefield.val("");
                            $("#searchroutes").click();
                        } else if (data.status == "exists") {
                            showNotification(detailnotifications, "info", "That route name already exists");
                        }
                    } else {
                        showNotification(detailnotifications, "danger", `Sorry an error occurred ${data}`);
                    }
                });
        }
    });

    $("#searchroutes").on("click", function (e) {
        e.preventDefault();
        const name = $("#filterroutename").val();
        $.getJSON("controllers/routeoperations.php", { filterroute: true, Name: name })
            .done(function (data) {
                let rows = "";
                if (data.length > 0) {
                    data.forEach(function (r, index) {
                        rows += `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${r.Name}</td>
                                <td>${r.OriginName || r.OriginalAirportID}</td>
                                <td>${r.DestinationName || r.DestinationAirportID}</td>
                                <td>${r.Distance}</td>
                                <td>${r.EstimatedDuration}</td>
                                <td><button class="btn btn-sm btn-primary editroute" data-id="${r.RouteID}"><i class="fas fa-edit"></i></button></td>
                            </tr>`;
                    });
                } else {
                    rows = `<tr><td colspan="7" class="text-center">No routes found</td></tr>`;
                }
                $("table tbody").html(rows);
            })
            .fail(function (response) { showNotification(filternotifications, "danger", response.responseText); });
    });

    $("#searchroutes").click();
});