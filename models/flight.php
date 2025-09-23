<?php
    require_once("db.php");

    class flight extends db{

        function checkflight($flightid,$flightnumber){
            $sql="CALL `sp_checkflight`({$flightid},'{$flightnumber}')";
            return $this->getData($sql)->rowCount();
        }

        function saveflight($flightid,$flightnumber,$originalairportid,$destinationairportid,$routeid){
            if($this->checkflight($flightid,$flightnumber)){
                return ["status"=>"exists","message"=>"flight number already exists"];
            }else{
                $sql="CALL `sp_saveflight`({$flightid},'{$flightnumber}',{$originalairportid},{$destinationairportid},{$routeid})";
                $this->getData($sql);
                return ["status"=>"success","message"=>"flight saved successfully"];
            }
        }

        function getflight(){
            $sql="CALL `sp_getflight`()";
            return $this->getJSON($sql);
        }

        function getflightdetails($flightid){
            $sql="CALL `sp_getflightdetails`({$flightid})";
            return $this->getJSON($sql);
        }

        function deleteflight($flightid){
            $sql="CALL `sp_deleteflight`({$flightid})";
            $this->getData($sql);
            return ["status"=>"success","message"=>"the flight was deleted successfully"];
        }
    }

?>