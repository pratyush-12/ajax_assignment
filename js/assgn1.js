$(document).ready(function() { 
  attr = "";
  col_name = "";
  item = "";
  doAjax("","");

  $('th').click(function(){
    attr = $(this).attr("id");
    this.asc = !this.asc;
     if (!this.asc) {
     // FOR DESCENDING ORDER
      order = "DESC";
    }else{
      order = "ASC";
    }
    doAjax(attr,order);
  });

  function doAjax(attr,order) {
    if (attr != "" && order != "") {
      col_name = attr;
      order_by = order;
    }else{
      col_name = "";
      order_by = "";
    }
    var data = {column_name:col_name,sort_by:order_by};
    callAjax(data);
    setInterval(function() { doAjax(col_name,order_by); }, 10000);
  }
  
  function callAjax(data){
    $.ajax({
      type: "GET",
      url: "display.php",
      data: data,        
      dataType: "json",              
      success: function(response){ 
        $.each( response, function( key, value ) {           
          item = item + " <tr> <td>" +value.name + "</td> <td>"+value.email +"</td> <td>"+value.message +"</td> <td>"+value.date +"</td> </tr>";               
        });      
        $(".detail").empty();
        $(".detail").append(item);
        item = ""
      }
    });
  }

});

