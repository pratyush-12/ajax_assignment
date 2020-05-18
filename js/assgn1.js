$(document).ready(function() { 

  attr = ""; order = "";  pageNum = 1; xhr = ""; pageNo="";
  maxRows = $('#maxRows').val();  
  doAjax("","",pageNum);
  
  $('#maxRows').change(function() {
    maxRows = $(this).val();
    $('[data-page=1]').trigger("click");
  });
    
  function doPagination(clickedPage) {
    $('.pagination').html('');
    pagenum = Math.ceil(totalRows / maxRows);
    for(var i=1; i<=pagenum;){
      $('.pagination').append('<li class="page-item page-link" data-page="'+i+'">'+ i++ +'<span class="sr-only">(current)</span> </li>').show();
    } 
    if(clickedPage){
      $('.pagination li').removeClass('active');
      $('[data-page="'+clickedPage+'"]').addClass('active');
      // $('[data-page="'+clickedPage+'"]').trigger("click");
    }
    $('.pagination li').click(function() {
      pageNum = $(this).attr('data-page');
      (attr != "") ? attr=attr : attr="";
      (order != "") ? order=order : order="";
      doAjax(attr,order,pageNum,totalRows);
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
    (totalRows != "") ? doAjax(attr,order,pageNum,totalRows) : doAjax(attr,order,pageNum);
  });

  function doAjax(attr,order,pageNo,totalRows=5) {
    if (attr != "" && order != "") {
      col_name = attr;
      order_by = order;
      limit_by = totalRows;
    }else{
      col_name = "";
      order_by = "";
      limit_by = totalRows;
    }
    
    var data = {column_name:col_name,sort_by:order_by,limit:limit_by};
    callAjax(data,pageNo);

    setInterval(function() { 
      doAjax(attr,order,pageNo,totalRows);
       }, 5000);
 
  }
  
  
  function callAjax(data,pageNo){
    xhr = $.ajax({
      type: "GET",
      url: "display.php",
      data: data,        
      dataType: "json",              
      success: function(response){ 
        result_array = [];
        $.each( response, function( key, value ) {     
          result_array[key] = " <tr id='"+ key +"''> <td>" +value.name + "</td> <td>"+value.email +"</td> <td>"+value.message +"</td> <td>"+value.date +"</td> </tr>";               
        });   
        // console.log(result_array);
        $('#totalRows').val(result_array.length);
        totalRows = $('#totalRows').val();
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
        doPagination(pageNo,totalRows);        
      }
    });
  }
});

    