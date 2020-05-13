$(document).ready(function() { 
  className = "";
  attr = "";
  col_name = "";
  item = "";

  $('th').click(function(){
    $(this).addClass("active"); 
    $(this).siblings().removeClass("active"); 
    className = "active";
    attr = $(this).attr("id");
    this.asc = !this.asc;
    if (!this.asc) {
      // FOR DESCENDING ORDER
      $(this).removeClass("active");
      $(this).addClass("nonactive");
      $(this).siblings().removeClass("nonactive");
      className = "nonactive";
      var click_data = {desc_column_name:attr};
    }else {
      click_data = {asc_column_name:attr};
    }
    callAjax(click_data);
  });

  $(function doAjax() {
    if (attr != "") {
      col_name = attr;
      order = className;
    }else{
      col_name = "";
      order = "";
    }
    var data = {column_name:col_name,sort_by:order};
    // $(".detail").empty();
    callAjax(data);
    setInterval(function() { doAjax(); }, 10000);
  });
  
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

