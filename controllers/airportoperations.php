<?php
    require_once("../models/airport.php");

    $airport= new airport();

    if(isset($_POST['saveairport'])){
        $airportid=$_POST['AirportID'];
        $airportname=$_POST['Name'];
        $airportcode=$_POST['AirportCode'];
        $airlineid=$_POST['AirlineID'];
        $cityid=$_POST['CityID'];
        $response=$airport->saveairport($airportid,$airportname,$airportcode,$airlineid,$cityid);
        echo json_encode($response);
    }

    if(isset($_GET['getairport'])){
        echo $airport->getairport();
    }

    if(isset($_GET['getairportdetails'])){
        $airportid=$_GET['AirportID'];
        echo $airport->getairportdetails($airportid);
    }

    if(isset($_POST['deleteairport'])){
        $airportid=$_POST['AirportID'];
        $response=$airport->deleteairport($airportid);
        echo json_encode($response);
    }

?>