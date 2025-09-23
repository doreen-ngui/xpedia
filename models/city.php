<?php
    require_once("db.php");

    class city extends db{

        function checkcity($cityid,$cityname){
            $sql="CALL `sp_checkcity`({$cityid},'{$cityname}')";
            return $this->getData($sql)->rowCount();
        }

        function savecity($cityid,$cityname,$countryid){
            if($this->checkcity($cityid,$cityname)){
                return ["status"=>"exists","message"=>"city name alraedy exists"];
            }else{
                $sql="CALL `sp_savecity`({$cityid},'{$cityname}',{$countryid})";
                $this->getData($sql);
                return ["status"=>"success","message"=>"city save successfully"];
            }
        }

        function getcity(){
            $sql="CALL `sp_getcity`()";
            return $this->getJSON($sql);
        }

        function getcitydetails($cityid){
            $sql="CALL `sp_getcitydetails`({$cityid})";
            return $this->getJSON($sql);
        }

        function deletecity($cityid){
            $sql="CALL `sp_deletecity`({$cityid})";
            $this->getData($sql);
            return ["status"=>"success","message"=>"the city was deleted successfully"];
        }
    }

?>