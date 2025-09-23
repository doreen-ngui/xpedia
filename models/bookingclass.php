<?php
    require_once("db.php");

    class bookingclass extends db{

        function checkbookingclass($bookingclassid,$bookingclassname){
            $sql="CALL `sp_checkbookingclass`({$bookingclassid},'{$bookingclassname}')";
            return $this->getData($sql)->rowCount();
        }

        function savebookingclass($bookingclassid,$bookingclassname){
            if($this->checkbookingclass($bookingclassid,$bookingclassname)){
                return ["status"=>"exists","message"=>"booking class name already exists"];
            }else{
                $sql="CALL `sp_savebookingclass`({$bookingclassid},'{$bookingclassname}')";
                $this->getData($sql);
                return ["status"=>"success","message"=>"booking class saved successfully"];
            }
        }

        function getbookingclass(){
            $sql="CALL `sp_getbookingclass`()";
            return $this->getJSON($sql);
        }

        function getbookingclassdetails($bookingclassid){
            $sql="CALL `sp_getbookingclassdetails`({$bookingclassid})";
            return $this->getJSON($sql);
        }

        function deletebookingclass($bookingclassid){
            $sql="CALL `sp_deletebookingclass`({$bookingclassid})";
            $this->getData($sql);
            return ["status"=>"success","message"=>"the booking class was deleted successfully"];
        }
    }

?>