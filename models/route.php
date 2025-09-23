<?php
    require_once("db.php");

    class route extends db{

        function checkroute($routeid,$routename){
            $sql="CALL `sp_checkroute`({$routeid},'{$routename}')";
            return $this->getData($sql)->rowCount();
        }

        function saveroute($routeid,$routename,$originalairportid,$destinationairportid,$distance,$estimatedduration){
            if($this->checkroute($routeid,$routename)){
                return ["status"=>"exists","message"=>"route name already exists"];
            }else{
                $sql="CALL `sp_saveroute`({$routeid},'{$routename}',{$originalairportid},{$destinationairportid},{$distance},'{$estimatedduration}')";
                $this->getData($sql);
                return ["status"=>"success","message"=>"route saved successfully"];
            }
        }

        function getroute(){
            $sql="CALL `sp_getroute`()";
            return $this->getJSON($sql);
        }

        function getroutedetails($routeid){
            $sql="CALL `sp_getroutedetails`({$routeid})";
            return $this->getJSON($sql);
        }

        function deleteroute($routeid){
            $sql="CALL `sp_deleteroute`({$routeid})";
            $this->getData($sql);
            return ["status"=>"success","message"=>"the route was deleted successfully"];
        }
    }

?>