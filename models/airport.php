<?php
    require_once("db.php");

    class airport extends db{

        function checkairport($airportid,$airportname){
            $sql="CALL `sp_checkairport`({$airportid},'{$airportname}')";
            return $this->getData($sql)->rowCount();
        }

        function saveairport($airportid,$airportname,$airportcode,$airlineid,$cityid){
            if($this->checkairport($airportid,$airportname)){
                return ["status"=>"exists","message"=>"airport name already exists"];
            }else{
                $sql="CALL `sp_saveairport`({$airportid},'{$airportname}','{$airportcode}',{$airlineid},{$cityid})";
                $this->getData($sql);
                return ["status"=>"success","message"=>"airport saved successfully"];
            }
        }

        function getairport(){
            $sql="CALL `sp_getairport`()";
            return $this->getJSON($sql);
        }

        function getairportdetails($airportid){
            $sql="CALL `sp_getairportdetails`({$airportid})";
            return $this->getJSON($sql);
        }

        function deleteairport($airportid){
            $sql="CALL `sp_deleteairport`({$airportid})";
            $this->getData($sql);
            return ["status"=>"success","message"=>"the airport was deleted successfully"];
        }
    }

?>