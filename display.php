<?php
$con=mysqli_connect("localhost","root","","samples"); 
$result = array();
$query=mysqli_query($con,"select * from student ORDER BY id DESC LIMIT 5");
while($row = $query->fetch_object()) {
    $result[] = $row;
}
echo json_encode($result);
?>