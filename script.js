function roundNumber(number,decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
      numString += ".";// give it one at the end
    }
    var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += "0";
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (for your purpose)
}
//function update_subtotal () {
//  var subtotal_value = 0;
//  $('#data .linetotal').map(function(){
//    var money = to_float($(this).val());
//    if (!isNaN(money)) {
//      subtotal_value += money;
//    }
//  });
//  $('#data #subtotal-value').val(to_currency(subtotal_value));
//  update_finaltotal();
//}
function doMath(col, col_total){
  var subtotal_totals = 0;
  $(col).map(function(){
    if (!isNaN(parseFloat($(this).val()))) {
      subtotal_totals += parseFloat($(this).val());
    }
  });
  subtotal_totals = roundNumber(subtotal_totals,2);
  $(col_total).val(subtotal_totals);  
  var gross_prior_totals = parseFloat($('#salesrev-prior-total').val()) - parseFloat($('#cos-prior-total').val());
  $('#gross-prior').val(gross_prior_totals);
  var gross_budget_totals = parseFloat($('#salesrev-budget-total').val()) - parseFloat($('#cos-budget-total').val());
  $('#gross-budget').val(gross_budget_totals);
  var gross_current_totals = parseFloat($('#salesrev-current-total').val()) - parseFloat($('#cos-current-total').val());
  $('#gross-current').val(gross_current_totals);
  var opexp_prior_totals = parseFloat($('#salesmarket-prior-total').val()) + parseFloat($('#rd-prior-total').val()) + parseFloat($('#general-prior-total').val());
  $('#opexp-prior-total').val(opexp_prior_totals);
  var opexp_budget_totals = parseFloat($('#salesmarket-budget-total').val()) + parseFloat($('#rd-budget-total').val()) + parseFloat($('#general-budget-total').val());
  $('#opexp-budget-total').val(opexp_budget_totals);
  var opexp_current_totals = parseFloat($('#salesmarket-current-total').val()) + parseFloat($('#rd-current-total').val()) + parseFloat($('#general-current-total').val());
  $('#opexp-current-total').val(opexp_current_totals);
  var income_prior_totals = parseFloat($('#gross-prior').val()) - parseFloat($('#opexp-prior-total').val());
  $('#income-prior-total').val(income_prior_totals);
  var income_budget_totals = parseFloat($('#gross-budget').val()) - parseFloat($('#opexp-budget-total').val());
  $('#income-budget-total').val(income_budget_totals);
  var income_current_totals = parseFloat($('#gross-current').val()) - parseFloat($('#opexp-current-total').val());
  $('#income-current-total').val(income_current_totals);
  var profit_prior_totals = parseFloat($('#income-prior-total').val()) + parseFloat($('#other-prior-total').val()) - parseFloat($('#taxes-prior-total').val());
  $('#profit-prior-total').val(profit_prior_totals);
  var profit_budget_totals = parseFloat($('#income-budget-total').val()) + parseFloat($('#other-budget-total').val()) - parseFloat($('#taxes-budget-total').val());
  $('#profit-budget-total').val(profit_budget_totals);  
  var profit_current_totals = parseFloat($('#income-current-total').val()) + parseFloat($('#other-current-total').val()) - parseFloat($('#taxes-current-total').val());
  $('#profit-current-total').val(profit_current_totals);
  var gm_totals = parseFloat($('#gross-current').val()) / parseFloat($('#salesrev-current-total').val());
  gm_totals = roundNumber(gm_totals,2);
  $('#gm-total').val(gm_totals);
  var ros_totals = parseFloat($('#profit-current-total').val()) / parseFloat($('#salesrev-current-total').val());
  ros_totals = roundNumber(ros_totals,2);
  $('#ros-total').val(ros_totals);
}
function update_all_salesrev (){
  doMath('#salesrev .prior', '#salesrev-prior-total');  
  doMath('#salesrev .budget', '#salesrev-budget-total');  
  doMath('#salesrev .current','#salesrev-current-total');   
  update_current(this);
  update_prior(this);
  update_budget(this);  
}
function update_current (target) {
  var rows = $(target).parents('table').find('.data-row');
  rows.map(function(){  
    var current_value = $(this).find('.current').val() / $(target).parents('table').find('.current-total').val() * 100;
    current_value = roundNumber(current_value,2);
    $(this).find('.current-percent').val(current_value);
  });
  doMath('#salesrev .prior-percent','#salesrev-prior-percent-total');
  doMath('#salesrev .budget-percent','#salesrev-budget-percent-total');
  doMath('#salesrev .current-percent','#salesrev-current-percent-total');       
}
function update_prior (target) {
  var row = $(target).parents('.data-row');
  var prior_value = (parseFloat(row.find('.current').val()) / parseFloat(row.find('.prior').val()) - 1) * 100;
  prior_value = roundNumber(prior_value,2);
  if (!isNaN(prior_value)){  
    row.find('.prior-percent').val(prior_value);
  }
  doMath('#salesrev .prior-percent','#salesrev-prior-percent-total'); 
}
function update_budget (target) {
  var row = $(target).parents('.data-row');
  var budget_value = (parseFloat(row.find('.current').val()) / parseFloat(row.find('.budget').val()) - 1) * 100;
  budget_value = roundNumber(budget_value,2);
  if (!isNaN(budget_value)){
    row.find('.budget-percent').val(budget_value);
  }
  doMath('#salesrev .budget-percent','#salesrev-budget-percent-total');  
}
function doRow(bottom, fake){
    $(bottom).before($(fake).clone().show());
}
$(document).ready(function(){
  $('.cancel').live('click',function(){
    $(this).parents('tr').remove();
  update_all_salesrev();  
  }); 
  $('#salesrev-addrow').click(function(){
    doRow('#bottomrow','#fakerow');
  });
  $('#cosaddrow').click(function(){
    doRow('#cosbottomrow','#cosfakerow');
  });
  $('#salesmarket-addrow').click(function(){
    doRow('#salesmarket-bottomrow','#salesmarket-fakerow');
  });  
  $('#rd-addrow').click(function(){
    doRow('#rd-bottomrow','#rd-fakerow');
  })
  $('#general-addrow').click(function(){
    doRow('#general-bottomrow','#general-fakerow');
  })
  $('#taxes-addrow').click(function(){
    doRow('#taxes-bottomrow','#taxes-fakerow');
  })
  $('#salesrev .prior').live('change',function(){
    doMath('#salesrev .prior', '#salesrev-prior-total');   
    update_prior(this);
  });
  $('#salesrev .budget').live('change',function(){
    doMath('#salesrev .budget', '#salesrev-budget-total');
    update_budget(this);     
  });
  $('#salesrev .current').live('change',function(){
    doMath('#salesrev .current','#salesrev-current-total');   
    update_current(this);
    update_prior(this);
    update_budget(this);   
  });        
  $('#cos .prior').live('change',function(){
    doMath('#cos .prior','#cos-prior-total'); 
  });
  $('#cos .budget').live('change',function(){
    doMath('#cos .budget','#cos-budget-total');    
  });
  $('#cos .current').live('change',function(){
    doMath('#cos .current','#cos-current-total');
    update_current('#cos .current','#cos-current-total');
  });    
  $('#salesmarket .prior').live('change',function(){
    doMath('#salesmarket .prior','#salesmarket-prior-total');
  });
  $('#salesmarket .budget').live('change',function(){
    doMath('#salesmarket .budget','#salesmarket-budget-total');
  });
  $('#salesmarket .current').live('change',function(){
    doMath('#salesmarket .current','#salesmarket-current-total');
  });
  $('#rd .prior').live('change',function(){
    doMath('#rd .prior','#rd-prior-total');
  });
  $('#rd .budget').live('change',function(){
    doMath('#rd .budget','#rd-budget-total');
  });
  $('#rd .current').live('change',function(){
    doMath('#rd .current','#rd-current-total');
  });
  $('#general .prior').live('change',function(){
    doMath('#general .prior','#general-prior-total');
  });
  $('#general .budget').live('change',function(){
    doMath('#general .budget','#general-budget-total');
  });
  $('#general .current').live('change',function(){
    doMath('#general .current','#general-current-total');
  });
  $('#taxes .prior').live('change',function(){
    doMath('#taxes .prior','#taxes-prior-total');
  });
  $('#taxes .budget').live('change',function(){
    doMath('#taxes .budget','#taxes-budget-total');
  });
  $('#taxes .current').live('change',function(){
    doMath('#taxes .current','#taxes-current-total');
  });
  $('#other-prior-total').live('change',function(){
    doMath('#other-prior-total','#other-prior-total');
  });
  $('#other-budget-total').live('change',function(){
    doMath('#other-budget-total','#other-budget-total');
  });
  $('#other-current-total').live('change',function(){
    doMath('#other-current-total','#other-current-total');
  });
//  $('#salesrev .current').live('blur',function(){
//    update_current('#salesrev .current','#salesrev-current-total');
//    });
//  $('#salesrev .current').live('blur',update_prior);
//  $('#salesrev .current').live('blur',update_budget);
//  $('#salesrev .prior').live('blur',update_prior);
//  $('#salesrev .budget').live('blur',update_budget);
//  $('#salesrev-current-total').live('blur',update_current);              
});