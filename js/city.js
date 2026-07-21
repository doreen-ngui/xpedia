$(document).ready(function () {
    const addnewbutton = $("#addnewcity"),
        citydetailsmodal = $("#citydetailsmodal"),
        filtercountylist = $("#filtercountry"),
        citycountrylist = $("#citydetailscountry"),
        filtercitynotifications = $("#filtercitynotifications"),
        citynamefield = $("#citydetailscityname"),
        savecitybutton = $("#savecity"),
        citydetailnotifications = $("#citydetailsnotifications"),
        cityidfield = $("#cityid"),
        inputfield = $("input"),
        selectfield = $("select");

    populateSelect(filtercountylist, "controllers/countryoperations.php", { getcountries: true }, "CountryID", "Name", "all");
    populateSelect(citycountrylist, "controllers/countryoperations.php", { getcountries: true }, "CountryID", "Name", "choose");

    inputfield.on("input", function () {
        citydetailnotifications.html("");
    });

    selectfield.on("change", function () {
        inputfield.trigger("input");
    });

    addnewbutton.on("click", function () {
        cityidfield.val(0);
        citynamefield.val("");
        citycountrylist.val("");
        citydetailnotifications.html("");
        citydetailsmodal.modal("show");
    });

    // Edit button handler — was missing before
    $(document).on("click", ".editcity", function () {
        const cityid = $(this).data("id");
        $.getJSON("controllers/cityoperations.php", { getcitydetails: true, CityID: cityid })
            .done(function (data) {
                if (data) {
                    cityidfield.val(data.CityID);
                    citynamefield.val(data.CityName);
                    citycountrylist.val(data.CountryID);
                    citydetailnotifications.html("");
                    citydetailsmodal.modal("show");
                }
            })
            .fail(function (response) {
                showNotification(filtercitynotifications, "danger", response.responseText);
            });
    });

    savecitybutton.on("click", function () {
        const cityid = cityidfield.val(),
            countryid = citycountrylist.val(),
            cityname = citynamefield.val();

        if (countryid == "") {
            showNotification(citydetailnotifications, "info", "Please select country first");
            citycountrylist.focus();
        } else if (cityname == "") {
            showNotification(citydetailnotifications, "info", "Please provide city name first");
            citynamefield.focus();
        } else {
            $.post(
                "controllers/cityoperations.php",
                { savecity: true, CityID: cityid, CityName: cityname, CountryID: countryid },
                function (data) {
                    if (isJSON(data)) {
                        data = JSON.parse(data);
                        if (data.status == "success") {
                            showNotification(citydetailnotifications, "success", "The city was saved successfully");
                            citynamefield.val("").focus();
                            $("#searchcities").click();
                        } else if (data.status == "exists") {
                            showNotification(citydetailnotifications, "info", "The city name already exists");
                            citynamefield.focus();
                        }
                    } else {
                        showNotification(citydetailnotifications, "danger", `Sorry an error occurred ${data}`);
                    }
                }
            );
        }
    });

    $("#searchcities").on("click", function (e) {
        e.preventDefault();
        const countryid = $("#filtercountry").val(),
            cityname = $("#filtercityname").val();

        $.getJSON("controllers/cityoperations.php", { filtercity: true, CountryID: countryid, CityName: cityname })
            .done(function (data) {
                let rows = "";
                if (data.length > 0) {
                    data.forEach(function (city, index) {
                        rows += `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${city.CountryName}</td>
                                <td>${city.CityName}</td>
                                <td>${city.airports || "-"}</td>
                                <td>${city.airlines || "-"}</td>
                                <td>
                                    <button class="btn btn-sm btn-primary editcity" data-id="${city.CityID}">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                            </tr>`;
                    });
                } else {
                    rows = `<tr><td colspan="6" class="text-center">No cities found</td></tr>`;
                }
                $("table tbody").html(rows);
            })
            .fail(function (response) {
                showNotification(filtercitynotifications, "danger", response.responseText);
            });
    });

    $("#searchcities").click();
});