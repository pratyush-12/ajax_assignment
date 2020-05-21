$(document).ready(function() { 
  attr = ""; order = "";  pageNum = 1; 
  maxRows = $('#maxRows').val();  
  doAjax(attr,order,maxRows,pageNum);
    
  $('#maxRows').change(function() {
    maxRows = $(this).val();
    doAjax(attr,order,maxRows);
  });
    
  function doPagination(maxRows,totalRows,clickedPage) {
    $('.pagination').html('');
    pagenum = Math.ceil(totalRows / maxRows);
    for(var i=1; i<=pagenum;){
      $('.pagination').append('<li class="page-item page-link" data-page="'+i+'">'+ i++ +'<span class="sr-only">(current)</span> </li>').show();
    } 
    $('[data-page=1]').addClass('active');
    if(clickedPage){
      $('.pagination li').removeClass('active');
      $('[data-page="'+clickedPage+'"]').addClass('active');
    }
    $('.pagination li').click(function() {
      pageNum = $(this).attr('data-page');
      (attr != "") ? attr=attr : attr="";
      (order != "") ? order=order : order="";
      doAjax(attr,order,maxRows,pageNum);
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
    doAjax(attr,order,maxRows,pageNum);
  });
              
  function doAjax(attr,order,maxRows,pageNum=1) {
    if (attr != "" && order != "") {
      col_name = attr;
      order_by = order;
      limit_by = maxRows * pageNum;
    }else{
      col_name = "";
      order_by = "";
      limit_by = maxRows * pageNum;
    }    
    var data = {column_name:col_name,sort_by:order_by,limit:limit_by};
    callAjax(data,pageNum);
  }
  
  
  function callAjax(data,pageNum){
    $.ajax({
      type: "GET",
      url: "display.php",
      data: data,        
      dataType: "json",              
      success: function(response){
        totalRows = response['total'].total;
        delete response["total"];
        result_array = [];
        $.each( response, function( key, value ) {     
          result_array[key] = " <tr id='"+ key +"''> <td>" +value.name + "</td> <td>"+value.email +"</td> <td>"+value.message +"</td> <td>"+value.date +"</td> </tr>";               
        });
        var result_item = "";        
        if(pageNum == 1){
          for(var k = 0; k < maxRows; k++){
            result_item = result_item + result_array[k];
          }
        }
        else{
          var end = pageNum*maxRows;
          var start = end - maxRows;
          for(var j = start; j < end; j++){
            result_item =  result_item + result_array[j];
          }

        }
        $(".detail").empty();                          
        $(".detail").append(result_item);
        result_item = "";
        doPagination(maxRows,totalRows,pageNum);        
      }
    });
  }

  setInterval(function() {
    pageNo = $('.active').attr('data-page');
    doAjax(attr,order,maxRows,pageNo);   
  }, 5000);

});

    