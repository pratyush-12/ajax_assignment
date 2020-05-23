$(document).ready(function() { 
  attr = ""; order = "";  pageNum = 1; error = 1;
  maxRows = $('#maxRows').val();  
  doAjax(attr,order,maxRows,pageNum);
  $('#user_date').datepicker({
    format: 'yyyy/mm/dd'
  });
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
    $(this).addClass('sort-active');
    $(this).siblings().removeClass('sort-active');
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
          result_array[key] = " <tr scope='row' id='"+ key +"''> <td>" +value.name + "</td> <td>"+value.email +"</td> <td>"+value.message +"</td> <td>"+value.date +"</td> </tr>";               
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

  $('#user_name').focusout(function(){
    if($(this).val() == ""){
      error = 1;
      $('#name_error').show();
    }else{
      error = 0;
      $('#name_error').hide();
    }
  });
  $('#user_email').focusout(function(){
    if($(this).val() == ""){
      error = 1;
      $('#email_error').show();
      $('#email_invalid').hide();
    }
    else if(IsEmail($(this).val()) == false){
      error = 1;
      $('#email_error').hide();
      $('#email_invalid').show();
    }
    else{
      error = 0;
      $('#email_error').hide();
      $('#email_invalid').hide();
    }
  });
  $('#user_message').focusout(function(){
    if($(this).val() == ""){
      error = 1;
      $('#message_error').show();
    }else{
      error = 0;
      $('#message_error').hide();
    }
  });
  $('#user_date').focusout(function(){
    if($(this).val() == ""){
      error = 1;
      $('#date_error').show();
    }else{
      error = 0;
      $('#date_error').hide();
    }
  });

  $('#modalSubmit').click(function(event){  
    var user_name = $('#user_name').val();
    var user_email = $('#user_email').val();
    var user_message = $('#user_message').val();
    var user_date = $('#user_date').val();
    event.preventDefault();
    if(error == 1){
      $('#TopError').show();
      setTimeout(function() { $("#TopError").fadeOut(); }, 4000);
    }else{
      var AddData = {name:user_name,email:user_email,message:user_message,date:user_date};
      addRecord(AddData);
      $('.form-control').val('');
    }
  });
  function IsEmail(email) {
      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;      
      if(!regex.test(email)) {
        return false;
      }else{
        return true;
      }
  }

  function addRecord(AddData) {
    $.ajax({
      type: "POST",
      url: "display.php",
      data: AddData,
      dataType: "json",                
      success: function(message){
        if (message.msg = "Successfull") {
          $('#success_message').show();
          setTimeout(function() { $("#success_message").hide(); }, 8000);
        } else {
          alert("failed");
        } 
        $('.close').trigger('click');
      }
    });
  }

  setInterval(function() {
    pageNo = $('.active').attr('data-page');
    doAjax(attr,order,maxRows,pageNo);   
  }, 5000);

});

    