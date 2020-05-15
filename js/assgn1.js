$(document).ready(function() { 
  
  attr = "";  col_name = "";  pagenum = 1;  maxRows = 3;  pageNum = 1;  totalRows = 10;  result_array = [];
  doAjax("","",pageNum);
    
  function doPagination(clickedPage) {
    maxRows = 3;
    totalRows = 10;
    $('.pagination').html('');
    pagenum = Math.ceil(totalRows / maxRows);
    for(var i=1; i<=pagenum;){
      $('.pagination').append('<li class="page-item page-link" data-page="'+i+'">'+ i++ +'<span class="sr-only">(current)</span> </li>').show();
    } 
    if(clickedPage){
      $('.pagination li').removeClass('active');
      $('[data-page="'+clickedPage+'"]').addClass('active');
    }
    $('.pagination li').click(function() {
      pageNum = $(this).attr('data-page');
      doAjax("","",pageNum);
    });
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
    doAjax(attr,order,pageNum);
  });

  function doAjax(attr,order,pageNo) {
    if (attr != "" && order != "") {
      col_name = attr;
      order_by = order;
    }else{
      col_name = "";
      order_by = "";
    }
    var data = {column_name:col_name,sort_by:order_by};
    callAjax(data,pageNo);
    // setInterval(function() { doAjax(col_name,order_by); $('.active').trigger("click"); }, 5000);
  }
  
  function callAjax(data,pageNo){
    $.ajax({
      type: "GET",
      url: "display.php",
      data: data,        
      dataType: "json",              
      success: function(response){ 
        $.each( response, function( key, value ) {     
          result_array[key] = " <tr id='"+ key +"''> <td>" +value.name + "</td> <td>"+value.email +"</td> <td>"+value.message +"</td> <td>"+value.date +"</td> </tr>";               
        });   
        var result_item = "";  
        if(pageNo == 1){
          for(var k = 0; k < maxRows; k++){
            result_item = result_item + result_array[k];
          }
        }
        else{
          var end = pageNo*maxRows;
          var start = end - maxRows;
          for(var j = start; j < end; j++){
            result_item =  result_item + result_array[j];
          }
        }
        $(".detail").empty();
        $(".detail").append(result_item);
        result_item = "";
        doPagination(pageNo);        
      }
    });
  }

});

    