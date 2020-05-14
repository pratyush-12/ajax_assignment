$(document).ready(function() { 
  attr = "";
  col_name = "";
  item = "";
  table = "";
  maxRows = 3;
  doAjax("","");
    
  function doPagination() {
    table = "#mytable";
    $('.pagination').html('');
    var trnum = 0;
    var totalRows = $(table +' tbody tr').length;
    if (totalRows > maxRows) {
      var pagenum = Math.ceil(totalRows / maxRows);
      for(var i=1; i<=pagenum;){
        $('.pagination').append('<li class="page-item page-link" data-page="'+i+'">'+ i++ +'<span class="sr-only">(current)</span> </li>').show();
      }
    }  
    $('.pagination li:first-child').addClass('active');
    $('.pagination li').click(function() {
      var pageNum = $(this).attr('data-page');
      var trIndex = 0; 
      $('.pagination li').removeClass('active');
      $(this).addClass('active');
      $(table+' tr:gt(0)').each(function() {
        trIndex++;
        if(trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum) - maxRows))
        {
          $(this).hide();
        }else{
          $(this).show();
        }
      });
    });
    $('.pagination li:first-child').trigger("click");
  }

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
        doPagination();
      }
    });
  }
});

