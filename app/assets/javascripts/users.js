$(document).ready(function () {
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
    // Watch for form submission:
    $("#form-submit-btn").click(function (event) {
        event.preventDefault();
        $('input[type=submit]').prop('disabled', true);
        var error = false;
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();

        if (!error) {
            // Get the Stripe token:
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler);
        }
        return false;
    }); // form submission

    function stripeResponseHandler(status, response) {
        // Get a reference to the form:
        var f = $("#new_user");

        // Get the token from the response:
        var token = response.id;

        // Add the token to the form
        f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
        f.append('<input type="hidden" name="user[stripeTokem]" value="' + token + '" />');

        // Submit the form:
        f.get(0).submit();
    }
});

//var stripeResponseHandler = function(status, response) {
//  var $form = $("#form-submit-btn");
//
//  if (response.error) {
//    // Show the errors on the form
//    $form.find('.payment-errors').text(response.error.message);
//    $form.find('button').prop('disabled', false);
//  } else {
//    // token contains id, last4, and card type
//    var token = response.id;
//    // Insert the token into the form so it gets submitted to the server
//    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
//    // and re-submit
//    $form.get(0).submit();
//  }
//};

//jQuery(function($) {
//  $('#payment-form').submit(function(e) {
//    var $form = $(this);
//
//    // Disable the submit button to prevent repeated clicks
//    $form.find('button').prop('disabled', true);
//
//    Stripe.card.createToken($form, stripeResponseHandler);
//
//    // Prevent the form from submitting with the default action
//    return false;
//  });
//});
