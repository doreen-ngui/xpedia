<?php
    require_once("../models/flightbooking.php");

    $flightbooking= new flightbooking();

    if(isset($_POST['saveflightbooking'])){
        $bookingid=$_POST['BookingID'];
        $flightid=$_POST['FlightID'];
        $bookingdate=$_POST['BookingDate'];
        $bookingtypeid=$_POST['BookingTypeID'];
        $bookingclassid=$_POST['BookingClassID'];
        $unitprice=$_POST['UnitPrice'];
        $paymentid=$_POST['PaymentID'];
        $response=$flightbooking->saveflightbooking($bookingid,$flightid,$bookingdate,$bookingtypeid,$bookingclassid,$unitprice,$paymentid);
        echo json_encode($response);
    }

    if(isset($_GET['getflightbooking'])){
        echo $flightbooking->getflightbooking();
    }

    if(isset($_GET['getflightbookingdetails'])){
        $bookingid=$_GET['BookingID'];
        echo $flightbooking->getflightbookingdetails($bookingid);
    }

    if(isset($_POST['deleteflightbooking'])){
        $bookingid=$_POST['BookingID'];
        $response=$flightbooking->deleteflightbooking($bookingid);
        echo json_encode($response);
    }

?>