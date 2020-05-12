<?php
$con=mysqli_connect("localhost","team_magento","team_magento@123","team_magento_new_joinee_pratyush"); 
$result = array();

if ($_REQUEST['sort_by'] != "") {
	if ($_REQUEST['sort_by'] == "active") {
		$order = "ASC";
	}elseif ($_REQUEST['sort_by'] == "nonactive") {
		$order = "DESC";
	}
}else {
	$order = "";
}

if (isset($_REQUEST['column_name']) && $order) {
	if ($_REQUEST['column_name']  != "" && isset($order)) {
		$query=mysqli_query($con,"select * from student ORDER BY ".$_REQUEST['column_name']." ".$order." LIMIT 5");
	}else{
		$query=mysqli_query($con,"select * from student ORDER BY id DESC LIMIT 5");
	}
}else{
	$query=mysqli_query($con,"select * from student ORDER BY id DESC LIMIT 5");
}

while($row = $query->fetch_object()) {
    $result[] = $row;
}
echo json_encode($result);
?>