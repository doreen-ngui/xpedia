<?php
    require_once("../models/route.php");

    $route= new route();

    if(isset($_POST['saveroute'])){
        $routeid=$_POST['RouteID'];
        $routename=$_POST['Name'];
        $originalairportid=$_POST['OriginalAirportID'];
        $destinationairportid=$_POST['DestinationAirportID'];
        $distance=$_POST['Distance'];
        $estimatedduration=$_POST['EstimatedDuration'];
        $response=$route->saveroute($routeid,$routename,$originalairportid,$destinationairportid,$distance,$estimatedduration);
        echo json_encode($response);
    }

    if(isset($_GET['getroute'])){
        echo $route->getroute();
    }

    if(isset($_GET['getroutedetails'])){
        $routeid=$_GET['RouteID'];
        echo $route->getroutedetails($routeid);
    }

    if(isset($_POST['deleteroute'])){
        $routeid=$_POST['RouteID'];
        $response=$route->deleteroute($routeid);
        echo json_encode($response);
    }

?>