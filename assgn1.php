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
		    <label>Select number of rows:</label>
		    <select class="form-control form-control-sm" id="maxRows">
		      	<option value="5" selected="selected">5</option>
				<option value="10">10</option>
				<option value="15">15</option>
				<option value="20">20</option>
		    </select>
		</div>
	</div>
	<h3 align="center">Details</h3>
	<p id="totalRows"></p>
	<table id="mytable" class="table-sm table-striped table-bordered">
	 	<thead>
		    <tr>
		      <th scope="col" id="name">Name</th>
		      <th scope="col" id="email">Email</th> 
		      <th scope="col" id="message">Message</th> 
		      <th scope="col" id="date">Date</th>
		    </tr>
	  	</thead>
	  	<tbody class="detail">
	  	</tbody>
	</table>
	<br><br>
	<div class="pagination-container">
		<nav>
			<ul class="pagination justify-content-center"></ul>
		</nav>
	</div>
</body>
</html>