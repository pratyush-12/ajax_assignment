$(document).ready(function() { 
  className = "";
  attr = "";
  col_name = "";
  item = "";
  doAjax("noclick");

  function doAjax(parameter) {
    if(parameter == "noclick"){
        if (attr != "") {
          col_name = attr;
          order = className;
        }else{
          col_name = "";
          order = "";
        }
        var data = {column_name:col_name,sort_by:order};
        callAjax(data);
        setInterval(function() { doAjax("noclick"); }, 10000);
    }
    else{
      var id_clicked = "#"+parameter;
      $(id_clicked).addClass("active");
      $(id_clicked).siblings().removeClass("active"); 
      className = "active";
      attr = $(id_clicked).attr("id");
      this.asc = !this.asc;
      if (!this.asc) {
      //   // FOR DESCENDING ORDER
        $(id_clicked).removeClass("active");
        $(id_clicked).addClass("nonactive");
        $(id_clicked).siblings().removeClass("nonactive");
        className = "nonactive";
        var click_data = {desc_column_name:attr};
      }else {
        click_data = {asc_column_name:attr};
      }
      callAjax(click_data);
    }
  }

   $('th').click(function(){
    attr = $(this).attr("id");
    doAjax(attr);
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

