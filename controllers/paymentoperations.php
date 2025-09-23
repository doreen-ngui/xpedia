<?php
    require_once("../models/payment.php");

    $payment= new payment();

    if(isset($_POST['savepayment'])){
        $paymentid=$_POST['PaymentID'];
        $paymentname=$_POST['PaymentName'];
        $response=$payment->savepayment($paymentid,$paymentname);
        echo json_encode($response);
    }

    if(isset($_GET['getpayment'])){
        echo $payment->getpayment();
    }

    if(isset($_GET['getpaymentdetails'])){
        $paymentid=$_GET['PaymentID'];
        echo $payment->getpaymentdetails($paymentid);
    }

    if(isset($_POST['deletepayment'])){
        $paymentid=$_POST['PaymentID'];
        $response=$payment->deletepayment($paymentid);
        echo json_encode($response);
    }

?>