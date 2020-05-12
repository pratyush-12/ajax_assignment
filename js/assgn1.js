$(document).ready(function() { 
  className = "";
  attr = "";
  col_name = "";

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
      data1 = {desc_column_name:attr};
    }else {
      data1 = {asc_column_name:attr};
    }
    $.ajax({
      type: "GET",
      url: "display.php",
      data: data1,        
      dataType: "json",              
      success: function(response){ 
        var item = ""; 
        $.each( response, function( key, value ) {           
          item = item + " <tr> <td>" +value.name + "</td> <td>"+value.email +"</td> <td>"+value.message +"</td> <td>"+value.date +"</td> </tr>";               
        });
        $(".detail").empty();
        $(".detail").append(item);
      }
    });
  });

  $(function doAjax() {
    if (attr != "") {
      col_name = attr;
      order = className;
    }else{
      col_name = "";
      order = "";
    }
    $.ajax({
      type: "GET",
      url: "display.php",    
      data: {column_name:col_name,sort_by:order},
      dataType: "json",              
      success: function(response){    
        newitem = "";
        $.each( response, function( key, value ) {           
          newitem = newitem + " <tr> <td>" +value.name + "</td> <td>"+value.email +"</td> <td>"+value.message +"</td> <td>"+value.date +"</td> </tr>";               
        });
        $(".detail").empty();
        $(".detail").append(newitem);
        setInterval(function() { doAjax(); }, 10000);
      }
    });
  });

  function comparer(index) {
    return function(a, b) {
      var valA = getCellValue(a, index), valB = getCellValue(b, index);
      return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
    }
  }

  function getCellValue(row, index){ 
    return $(row).children('td').eq(index).text();
  }

});

