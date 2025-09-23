<?php
    require_once("../models/documents.php");

    $documents= new documents();

    if(isset($_POST['savedocuments'])){
        $documentid=$_POST['DocumentID'];
        $documentname=$_POST['Name'];
        $response=$documents->savedocuments($documentid,$documentname);
        echo json_encode($response);
    }

    if(isset($_GET['getdocument'])){
        echo $documents->getdocument();
    }

    if(isset($_GET['getdocumentsdetails'])){
        $documentid=$_GET['DocumentID'];
        echo $documents->getdocumentsdetails($documentid);
    }

    if(isset($_POST['deletedocument'])){
        $documentid=$_POST['DocumentID'];
        $response=$documents->deletedocument($documentid);
        echo json_encode($response);
    }

?>