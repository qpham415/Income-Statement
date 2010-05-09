function doMath(cell){
  var totals = 0;
  var cols = $(cell).parents('table').find('.prior');
  $(cols).map(function(){
    if (!isNaN(parseFloat($(this).val()))) {
      totals += parseFloat($(this).val());
    }
  });
  var total_cell = $(cell).parents('table').find('.prior_totals');
  $(total_cell).val(totals);
  
  var gross_prior_totals = parseFloat($('#salesrev-prior-total').val()) - parseFloat($('#cos-prior-total').val());
  $('#gross-prior').val(gross_prior_totals);
  var gross_budget_totals = parseFloat($('#salesrev-budget-total').val()) - parseFloat($('#cos-budget-total').val());
  $('#gross-budget').val(gross_budget_totals);
  var gross_current_totals = parseFloat($('#salesrev-current-total').val()) - parseFloat($('#cos-current-total').val());
  $('#gross-current').val(gross_current_totals);  
}
$(document).ready(function(){
  $('#addrow').click(function(){
    $('#bottomrow').before($('#fakerow').clone().show());
  });
  $('.cancel').live('click',function(){
    $(this).parents('tr').remove();
  });
  $('#cosaddrow').click(function(){
    $('#cosbottomrow').before($('#cosfakerow').clone().show());
  });
  $('.cancel').live('click',function(){
    $(this).parents('tr').remove();
  });  
  $('#salesrev .prior').live('change',function(){
    doMath(this,'');
  });
  $('#salesrev .budget').live('change',function(){
    doMath('#salesrev .budget', '#salesrev-budget-total')
  });
  $('#salesrev .current').live('change',function(){
    doMath('#salesrev .current','#salesrev-current-total');
  });
  $('#cos .prior').live('change',function(){
    doMath('#cos .prior','#cos-prior-total')
  });
  $('#cos .budget').live('change',function(){
    doMath('#cos .budget','#cos-budget-total')
  });
  $('#cos .current').live('change',function(){
    doMath('#cos .current','#cos-current-total')
  });    
});