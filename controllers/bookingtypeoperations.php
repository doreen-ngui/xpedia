<?php
    require_once("../models/bookingtype.php");

    $bookingtype= new bookingtype();

    if(isset($_POST['savebookingtype'])){
        $bookingtypeid=$_POST['BookingTypeID'];
        $bookingtypename=$_POST['Name'];
        $response=$bookingtype->savebookingtype($bookingtypeid,$bookingtypename);
        echo json_encode($response);
    }

    if(isset($_GET['getbookingtype'])){
        echo $bookingtype->getbookingtype();
    }

    if(isset($_GET['getbookingtypedetails'])){
        $bookingtypeid=$_GET['BookingTypeID'];
        echo $bookingtype->getbookingtypedetails($bookingtypeid);
    }

    if(isset($_POST['deletebookingtype'])){
        $bookingtypeid=$_POST['BookingTypeID'];
        $response=$bookingtype->deletebookingtype($bookingtypeid);
        echo json_encode($response);
    }

?>