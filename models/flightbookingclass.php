<?php
    require_once("db.php");

    class flightbookingclass extends db{

        function checkflightbookingclass($f_bookingclassid,$bookingclassid){
            $sql="CALL `sp_checkflightbookingclass`({$f_bookingclassid},'{$bookingclassid}')";
            return $this->getData($sql)->rowCount();
        }

        function saveflightbookingclass($f_bookingclassid,$bookingclassid,$flightid,$no_of_seats,$unitprice,$currency){
            if($this->checkflightbookingclass($f_bookingclassid,$bookingclassid)){
                return ["status"=>"exists","message"=>"flight booking class already exists"];
            }else{
                $sql="CALL `sp_saveflightbookingclass`({$f_bookingclassid},'{$bookingclassid}',{$flightid},{$no_of_seats},{$unitprice},'{$currency}')";
                $this->getData($sql);
                return ["status"=>"success","message"=>"flight booking class saved successfully"];
            }
        }

        function getflightbookingclass(){
            $sql="CALL `sp_getflightbookingclass`()";
            return $this->getJSON($sql);
        }

        function getflightbookingclassdetails($flightbookingclassid){
            $sql="CALL `sp_getflightbookingclassdetails`({$flightbookingclassid})";
            return $this->getJSON($sql);
        }

        function deleteflightbookingclass($flightbookingclassid){
            $sql="CALL `sp_deleteflightbookingclass`({$flightbookingclassid})";
            $this->getData($sql);
            return ["status"=>"success","message"=>"the flight booking class was deleted successfully"];
        }
    }

?>