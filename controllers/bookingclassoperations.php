<?php
    require_once("../models/bookingclass.php");

    $bookingclass= new bookingclass();

    if(isset($_POST['savebookingclass'])){
        $bookingclassid=$_POST['BookingClassID'];
        $bookingclassname=$_POST['Name'];
        $response=$bookingclass->savebookingclass($bookingclassid,$bookingclassname);
        echo json_encode($response);
    }

    if(isset($_GET['getbookingclass'])){
        echo $bookingclass->getbookingclass();
    }

    if(isset($_GET['getbookingclassdetails'])){
        $bookingclassid=$_GET['BookingClassID'];
        echo $bookingclass->getbookingclassdetails($bookingclassid);
    }

    if(isset($_POST['deletebookingclass'])){
        $bookingclassid=$_POST['BookingClassID'];
        $response=$bookingclass->deletebookingclass($bookingclassid);
        echo json_encode($response);
    }

?>