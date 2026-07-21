/**
 * js/dashboard.js
 */
(function () {
  var API = 'controllers/api.php';
  var BOOKING_API = 'controllers/booking.php';

  function fetchJSON(url) {
    return fetch(url).then(function (res) { return res.json(); });
  }

  function lookupMap(list, idKey, labelKey) {
    var map = {};
    (list || []).forEach(function (item) { map[item[idKey]] = item[labelKey]; });
    return map;
  }

  Promise.all([
    fetchJSON(API + '?entity=flight&action=list'),
    fetchJSON(API + '?entity=route&action=list'),
    fetchJSON(API + '?entity=airport&action=list'),
    fetchJSON(API + '?entity=bookingclass&action=list'),
    fetchJSON(API + '?entity=payment&action=list'),
    fetchJSON(BOOKING_API + '?action=list'),
  ]).then(function (results) {
    var flights = results[0].data || [];
    var routes = results[1].data || [];
    var airports = results[2].data || [];
    var bookingClasses = results[3].data || [];
    var payments = results[4].data || [];
    var bookings = results[5].data || [];

    document.getElementById('statFlights').textContent = flights.length;
    document.getElementById('statRoutes').textContent = routes.length;
    document.getElementById('statAirports').textContent = airports.length;
    document.getElementById('statBookings').textContent = bookings.length;

    var flightMap = lookupMap(flights, 'FlightID', 'FlightNumber');
    var classMap = lookupMap(bookingClasses, 'BookingClassID', 'Name');
    var paymentMap = lookupMap(payments, 'PaymentID', 'PaymentName');

    var tbody = document.getElementById('bookingsBody');
    tbody.innerHTML = '';

    var recent = bookings.slice(-8).reverse();
    if (recent.length === 0) {
      var tr = document.createElement('tr');
      tr.className = 'empty-row';
      var td = document.createElement('td');
      td.colSpan = 7;
      td.textContent = 'No bookings yet — make your first booking.';
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    recent.forEach(function (b) {
      var tr = document.createElement('tr');
      [
        '#' + b.BookingID,
        flightMap[b.FlightID] || ('Flight #' + b.FlightID),
        b.BookingDate,
        classMap[b.BookingClassID] || b.BookingClassID,
        b.UnitPrice,
        paymentMap[b.PaymentID] || b.PaymentID,
      ].forEach(function (val) {
        var td = document.createElement('td');
        td.textContent = val;
        tr.appendChild(td);
      });
      var actionsTd = document.createElement('td');
      var cancelBtn = document.createElement('button');
      cancelBtn.className = 'btn btn--danger btn--small';
      cancelBtn.textContent = 'Cancel';
      cancelBtn.onclick = function () {
        if (!confirm('Cancel booking #' + b.BookingID + '?')) return;
        fetch(BOOKING_API + '?action=cancel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: b.BookingID }),
        }).then(function () { window.location.reload(); });
      };
      actionsTd.appendChild(cancelBtn);
      tr.appendChild(actionsTd);
      tbody.appendChild(tr);
    });
  }).catch(function (err) {
    var alertBox = document.getElementById('alertBox');
    alertBox.textContent = err.message || 'Could not load dashboard data.';
    alertBox.className = 'alert alert--error';
    alertBox.style.display = 'block';
  });
})();
