<?php
    require_once("../models/flight.php");

    $flight= new flight();

    if(isset($_POST['saveflight'])){
        $flightid=$_POST['FlightID'];
        $flightnumber=$_POST['FlightNumber'];
        $originalairportid=$_POST['OriginalAirportID'];
        $destinationairportid=$_POST['DestinationAirportID'];
        $routeid=$_POST['RouteID'];
        $response=$flight->saveflight($flightid,$flightnumber,$originalairportid,$destinationairportid,$routeid);
        echo json_encode($response);
    }

    if(isset($_GET['getflight'])){
        echo $flight->getflight();
    }

    if(isset($_GET['getflightdetails'])){
        $flightid=$_GET['FlightID'];
        echo $flight->getflightdetails($flightid);
    }

    if(isset($_POST['deleteflight'])){
        $flightid=$_POST['FlightID'];
        $response=$flight->deleteflight($flightid);
        echo json_encode($response);
    }

?>
