<?php
    require_once("db.php");

    class documents extends db{

        function checkdocuments($documentid,$documentname){
            $sql="CALL `sp_checkdocuments`({$documentid},'{$documentname}')";
            return $this->getData($sql)->rowCount();
        }

        function savedocuments($documentid,$documentname){
            if($this->checkdocuments($documentid,$documentname)){
                return ["status"=>"exists","message"=>"documents name already exists"];
            }else{
                $sql="CALL `sp_savedocuments`({$documentid},'{$documentname}')";
                $this->getData($sql);
                return ["status"=>"success","message"=>"documents saved successfully"];
            }
        }

        function getdocument(){
            $sql="CALL `sp_getdocument`()";
            return $this->getJSON($sql);
        }

        function getdocumentsdetails($documentid){
            $sql="CALL `sp_getdocumentsdetails`({$documentid})";
            return $this->getJSON($sql);
        }

        function deletedocument($documentid){
            $sql="CALL `sp_deletedocument`({$documentid})";
            $this->getData($sql);
            return ["status"=>"success","message"=>"the document was deleted successfully"];
        }
    }

?>
     