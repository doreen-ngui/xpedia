<?php
    require_once("db.php");

    class passenger extends db{

        function checkpassenger($passengerbookingid,$documentnumber){
            $sql="CALL `sp_checkpassenger`({$passengerbookingid},'{$documentnumber}')";
            return $this->getData($sql)->rowCount();
        }

        function savepassenger($passengerbookingid,$bookingid,$bookingclassid,$fullname,$documentid,$documentnumber,$gender,$dob){
            if($this->checkpassenger($passengerbookingid,$documentnumber)){
                return ["status"=>"exists","message"=>"passenger already exists"];
            }else{
                $sql="CALL `sp_savepassenger`({$passengerbookingid},{$bookingid},{$bookingclassid},'{$fullname}',{$documentid},'{$documentnumber}','{$gender}','{$dob}')";
                $this->getData($sql);
                return ["status"=>"success","message"=>"passenger saved successfully"];
            }
        }

        function getpassenger(){
            $sql="CALL `sp_getpassenger`()";
            return $this->getJSON($sql);
        }

        function getpassengerdetails($passengerbookingid){
            $sql="CALL `sp_getpassengerdetails`({$passengerbookingid})";
            return $this->getJSON($sql);
        }

        function deletepassenger($passengerbookingid){
            $sql="CALL `sp_deletepassenger`({$passengerbookingid})";
            $this->getData($sql);
            return ["status"=>"success","message"=>"the passenger was deleted successfully"];
        }
    }

?>