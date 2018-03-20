<?php
include '../autoload.php';
//call Class by Magic
$pdoMysql = new Model_sqlDynamic($conn);

// TABLE
$query = "SELECT * FROM TB_CUSTOMER WHERE ID = 1";
$pdoMysql->selectQuery($query);
$result = $pdoMysql->_rendata[0];
echo $result['NAME'];
?>