<!DOCTYPE html>
<head>  
	<script src="js/jquery-3.5.1.js"></script>
	<script src="bootstrap/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
	<script src="js/assgn1.js"></script>
	<link rel="stylesheet" type="text/css" href="css/assgn1.css">
</head>
<body>
	<div class="container">
		<div class="form-group">
			<select name="state" id="maxRows" class="form-control-md">
				<option disabled="disabled" selected="selected">Select number of rows</option>
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="15">15</option>
			</select>
		</div>	
	</div>
	<h3 align="center">Details</h3>
	<table id="mytable">
	 	<thead>
		    <tr>
		      <th id="name">Name</th>
		      <th id="email">Email</th> 
		      <th id="message">Message</th> 
		      <th id="date">Date</th>
		    </tr>
	  	</thead>
	  	<tbody class="detail">
	  	</tbody>
	</table>
	<div class="pagination-container">
		<nav>
			<ul class="pagination"></ul>
		</nav>
	</div>
</body>
</html>