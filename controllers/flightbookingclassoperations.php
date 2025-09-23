<?php
    require_once("../models/flightbookingclass.php");

    $flightbookingclass= new flightbookingclass();

    if(isset($_POST['saveflightbookingclass'])){
        $f_bookingclassid=$_POST['F_BookingClassID'];
        $bookingclassid=$_POST['BookingClassID'];
        $flightid=$_POST['FlightID'];
        $no_of_seats=$_POST['No_of_seats'];
        $unitprice=$_POST['UnitPrice'];
        $currency=$_POST['Currency'];
        $response=$flightbookingclass->saveflightbookingclass($f_bookingclassid,$bookingclassid,$flightid,$no_of_seats,$unitprice,$currency);
        echo json_encode($response);
    }

    if(isset($_GET['getflightbookingclass'])){
        echo $flightbookingclass->getflightbookingclass();
    }

    if(isset($_GET['getflightbookingclassdetails'])){
        $f_bookingclassid=$_GET['F_BookingClassID'];
        echo $flightbookingclass->getflightbookingclassdetails($f_bookingclassid);
    }

    if(isset($_POST['deleteflightbookingclass'])){
        $f_bookingclassid=$_POST['F_BookingClassID'];
        $response=$flightbookingclass->deleteflightbookingclass($f_bookingclassid);
        echo json_encode($response);
    }

?>