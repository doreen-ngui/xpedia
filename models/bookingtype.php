<?php
    require_once("db.php");

    class bookingtype extends db{

        function checkbookingtype($bookingtypeid,$bookingtypename){
            $sql="CALL `sp_checkbookingtype`({$bookingtypeid},'{$bookingtypename}')";
            return $this->getData($sql)->rowCount();
        }

        function savebookingtype($bookingtypeid,$bookingtypename){
            if($this->checkbookingtype($bookingtypeid,$bookingtypename)){
                return ["status"=>"exists","message"=>"bookingtype name already exists"];
            }else{
                $sql="CALL `sp_savebookingtype`({$bookingtypeid},'{$bookingtypename}')";
                $this->getData($sql);
                return ["status"=>"success","message"=>"bookingtype saved successfully"];
            }
        }

        function getbookingtype(){
            $sql="CALL `sp_getbookingtype`()";
            return $this->getJSON($sql);
        }

        function getbookingtypedetails($bookingtypeid){
            $sql="CALL `sp_getbookingtypedetails`({$bookingtypeid})";
            return $this->getJSON($sql);
        }

        function deletebookingtype($bookingtypeid){
            $sql="CALL `sp_deletebookingtype`({$bookingtypeid})";
            $this->getData($sql);
            return ["status"=>"success","message"=>"the bookingtype was deleted successfully"];
        }
    }

?>