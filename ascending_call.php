<?php
$con=mysqli_connect("localhost","team_magento","team_magento@123","team_magento_new_joinee_pratyush"); 
$col = $_REQUEST['column_name'];
$result = array();
$query=mysqli_query($con,"select * from student ORDER BY ".$col." ASC LIMIT 5");
while($row = $query->fetch_object()) {
    $result[] = $row;
}
echo json_encode($result);
?>