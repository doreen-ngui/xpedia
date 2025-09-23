<?php
    require_once("../models/country.php");

    $country= new country();

    if(isset($_POST['savecountry'])){
        $countryid=$_POST['CountryID'];
        $countryname=$_POST['Name'];
        $response=$country->savecountry($countryid,$countryname);
        echo json_encode($response);
    }

    if(isset($_GET['getcountry'])){
        echo $country->getcountry();
    }

    if(isset($_GET['getcountrydetails'])){
        $countryid=$_GET['CountryID'];
        echo $country->getcountrydetails($countryid);
    }

    if(isset($_POST['deletecountry'])){
        $countryid=$_POST['CountryID'];
        $response=$country->deletecountry($countryid);
        echo json_encode($response);
    }

?>