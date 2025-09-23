<?php
    require_once("db.php");

    class payment extends db{

        function checkpayment($paymentid,$paymentname){
            $sql="CALL `sp_checkpayment`({$paymentid},'{$paymentname}')";
            return $this->getData($sql)->rowCount();
        }

        function savepayment($paymentid,$paymentname){
            if($this->checkpayment($paymentid,$paymentname)){
                return ["status"=>"exists","message"=>"payment name already exists"];
            }else{
                $sql="CALL `sp_savepayment`({$paymentid},'{$paymentname}')";
                $this->getData($sql);
                return ["status"=>"success","message"=>"payment saved successfully"];
            }
        }

        function getpayment(){
            $sql="CALL `sp_getpayment`()";
            return $this->getJSON($sql);
        }

        function getpaymentdetails($paymentid){
            $sql="CALL `sp_getpaymentdetails`({$paymentid})";
            return $this->getJSON($sql);
        }

        function deletepayment($paymentid){
            $sql="CALL `sp_deletepayment`({$paymentid})";
            $this->getData($sql);
            return ["status"=>"success","message"=>"the payment was deleted successfully"];
        }
    }

?>