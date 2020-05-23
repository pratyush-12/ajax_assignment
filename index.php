<!DOCTYPE html>
<head>  
	<script src="js/jquery-3.5.1.js"></script>
	<script src="bootstrap/js/bootstrap.min.js"></script>
	<script src="bootstrap/js/bootstrap-datepicker.min.js"></script>
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap-datepicker.min.css">
	<script src="js/assgn1.js"></script>
	<link rel="stylesheet" type="text/css" href="css/assgn1.css">
</head>
<body>
	<div class="container">
		<div class="form-group filter-row" style="">
		    <label>No. of rows:</label>
		    <select class="form-control form-control-sm" id="maxRows">
		      	<option value="5" selected="selected">5</option>
				<option value="10">10</option>
				<option value="15">15</option>
				<option value="20">20</option>
		    </select>
		    <button id="AddButton" type="button" class="btn btn-primary" data-toggle="modal" data-target="#AddRecord">Add</button>
		</div>
	</div>
	<h3 align="center">Details</h3>
	<p id="totalRows"></p>
	<div id="success_message" class="alert alert-primary" role="alert" style="">
  		Data Added Successfully
	</div>
	<table class="table-sm table-striped table-bordered">
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
	<div class="pagination-container">
		<nav>
			<ul class="pagination justify-content-center"></ul>
		</nav>
	</div>
	<!-- Modal -->
	<div class="modal fade" id="AddRecord" tabindex="-1" role="dialog">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">
		    <div class="modal-header">
		    	<h5 class="modal-title">Add New Record</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		    </div>
		    <p id="TopError">Please fill all the details</p>
		    <div class="modal-body">
		      	<form id="AddForm">
		      		<div class="form-group">
					    <label for="name">Name</label>
					    <input type="text" class="form-control modalInput" id="user_name" aria-describedby="user_name" placeholder="Enter Name">
					    <p class="modal-error" id="name_error">* Please enter name</p>
					</div>
					<div class="form-group">
					    <label for="email">Email</label>
					    <input type="email" class="form-control modalInput" id="user_email" aria-describedby="user_email" placeholder="Enter Email">
					    <p class="modal-error" id="email_error">* Please enter email</p>
					    <p class="modal-error" id="email_invalid">* Please enter valid email</p>
					</div>
					<div class="form-group">
					    <label for="message">Message</label>
					    <input type="text" class="form-control modalInput" id="user_message" aria-describedby="user_message" placeholder="Enter Message">
					    <p class="modal-error" id="message_error">* Please enter message</p>
					</div>
					<div class="form-group">
					    <label for="date">Date</label>
					    <input type="text" class="form-control modalInput" id="user_date" aria-describedby="user_date" placeholder="Enter Date">
					    <p class="modal-error" id="date_error">* Please enter date</p>
					</div>					  
					<button id="modalSubmit" type="submit" class="btn btn-primary">Submit</button>
		     </form>
		    </div>
		</div>
	  </div>
	</div>
</body>
</html>