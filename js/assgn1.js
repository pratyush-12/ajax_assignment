$(document).ready(function doAjax() { 
      $.ajax({
        type: "GET",
        url: "display.php",             
        dataType: "json",              
        success: function(response){    
              newitem = $("<table border='2' align='center' cellpadding='10'> <tr> <th>Name</th> <th>Email</th> <th>Message</th> <th>Date</th> </tr>");
              newitem = "<table> <tr> <th>Name</th> <th>Email</th> <th>Message</th> <th>Date</th> </tr>";
              $.each( response, function( key, value ) {
                newitem = newitem + " <tr> <td>" +value.name + "</td> <td>"+value.email +"</td> <td>"+value.message +"</td> <td>"+value.date +"</td> </tr>";               
              });
               newitem = newitem + "</table>";
              $(".detail").replaceWith(newitem);
              setInterval(function(){
                  doAjax() 
                }, 5000);
        }
    });
});
