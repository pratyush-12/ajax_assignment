$(document).ready(function doAjax() { 
  $.ajax({
    type: "GET",
    url: "display.php",             
    dataType: "json",              
    success: function(response){    
      newitem = "";
      $.each( response, function( key, value ) {           
        newitem = newitem + " <tr> <td>" +value.name + "</td> <td>"+value.email +"</td> <td>"+value.message +"</td> <td>"+value.date +"</td> </tr>";               
      });
      $(".detail").replaceWith(newitem);
      setInterval(function() { doAjax() }, 3000);
    }
  });
});
