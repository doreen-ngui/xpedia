<?php
    require_once("../models/airline.php");

    $airline= new airline();

    if(isset($_POST['saveairline'])){
        $airlineid=$_POST['AirlineID'];
        $logourl=$_POST['LogoURL'];
        $airlinename=$_POST['Name'];
        $countryid=$_POST['CountryID'];
        $response=$airline->saveairline($airlineid,$logourl,$airlinename,$countryid);
        echo json_encode($response);
    }

    if(isset($_GET['getairline'])){
        echo $airline->getairline();
    }

    if(isset($_GET['getairlinedetails'])){
        $airlineid=$_GET['AirlineID'];
        echo $airline->getairlinedetails($airlineid);
    }

    if(isset($_POST['deleteairline'])){
        $airlineid=$_POST['AirlineID'];
        $response=$airline->deleteairline($airlineid);
        echo json_encode($response);
    }

?>