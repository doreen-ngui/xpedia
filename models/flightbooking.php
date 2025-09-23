<?php
    require_once("db.php");

    class flightbooking extends db{

        function checkflightbooking($bookingid,$flightid){
            $sql="CALL `sp_checkflightbooking`({$bookingid},'{$flightid}')";
            return $this->getData($sql)->rowCount();
        }

        function saveflightbooking($bookingid,$flightid,$bookingdate,$bookingtypeid,$bookingclassid,$unitprice,$paymentid){
            if($this->checkflightbooking($bookingid,$flightid)){
                return ["status"=>"exists","message"=>"flight booking already exists"];
            }else{
                $sql="CALL `sp_saveflightbooking`({$bookingid},'{$flightid}','{$bookingdate}',{$bookingtypeid},{$bookingclassid},{$unitprice},{$paymentid})";
                $this->getData($sql);
                return ["status"=>"success","message"=>"flight booking saved successfully"];
            }
        }

        function getflightbooking(){
            $sql="CALL `sp_getflightbooking`()";
            return $this->getJSON($sql);
        }

        function getflightbookingdetails($bookingid){
            $sql="CALL `sp_getflightbookingdetails`({$bookingid})";
            return $this->getJSON($sql);
        }

        function deleteflightbooking($bookingid){
            $sql="CALL `sp_deleteflightbooking`({$bookingid})";
            $this->getData($sql);
            return ["status"=>"success","message"=>"the flight booking was deleted successfully"];
        }
    }

?>