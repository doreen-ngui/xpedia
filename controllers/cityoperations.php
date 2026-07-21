<?php
    require_once("../models/city.php");

    $city= new city();

    if(isset($_POST['savecity'])){
        $cityid=$_POST['CityID'];
        $cityname=$_POST['CityName'];
        $countryid=$_POST['CountryID'];
        $response=$city->savecity($cityid,$cityname,$countryid);
        echo json_encode($response);
    }

     if(isset($_GET['filtercity'])){
        $countryid=isset($_GET['CountryID'])?$_GET['CountryID']:0;

       
        echo $city->getcity($CountryID);
    }

    
    if(isset($_GET['getcity'])){
        echo $city->getcity();
    }

    if(isset($_GET['getcitydetails'])){
        $cityid=$_GET['CityID'];
        echo $city->getcitydetails($cityid);
    }

    if(isset($_POST['deletecity'])){
        $cityid=$_POST['CityID'];
        $response=$city->deletecity($cityid);
        echo json_encode($response);
    }

?>