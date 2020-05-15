<?php
$con=mysqli_connect("localhost","team_magento","team_magento@123","team_magento_new_joinee_pratyush"); 
// $con=mysqli_connect("localhost","root","","samples"); 

$result = array();
if ($_REQUEST['column_name'] != "" && $_REQUEST['sort_by'] != "") {
	$query=mysqli_query($con,"select * from student ORDER BY ".$_REQUEST['column_name']." ".$_REQUEST['sort_by']." LIMIT ".$_REQUEST['limit']."");
}else{
	$query=mysqli_query($con,"select * from student ORDER BY id ASC LIMIT ".$_REQUEST['limit']."");
}

while($row = $query->fetch_object()) {
    $result[] = $row;
}
echo json_encode($result);
?>