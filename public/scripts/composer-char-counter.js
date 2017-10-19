const limit = 140;
$(document).ready( function() { //change counter w/ jquery
  $('form > textarea').on('keyup', function() {
    //this is textarea under the form html-DOM element
    let input = $(this).val();
    let charLeft = limit - input.length;
    let counter = $(this).closest('form').find('.counter');
    let counted = counter.text(charLeft);
    //if exceeds letter limit, make it red
    (charLeft < 0) ? counter.addClass('red') : counter.removeClass('red');
  });
});
