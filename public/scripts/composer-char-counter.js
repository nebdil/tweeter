const limit = 140;
$(document).ready( function() {
  $('form > textarea').on('keyup', function() {
    //this is textarea html-DOM element
    let input = $(this).val();
    let charLeft = limit - input.length;
    let counter = $(this).closest('form').find('.counter');
    let counted = counter.text(charLeft);
    if (charLeft < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});
