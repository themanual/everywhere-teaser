// Placeholder stuff
$("[data-placeholder]").each(function() {

  if ($.trim($(this).data("placeholder")) === "") {
    return true;
  }

  // Event handlers  
  $(this).on({
    focus: function() {
      var $input = $(this);
      if ($input.val() === $input.data("placeholder")) {
        $input.val("");
        $input.removeClass("placeholder");
      }
    },
    blur: function() {
      var $input = $(this);
      if ($input.val() === "" || $input.val() === $input.data("placeholder")) {
        $input.val($input.data("placeholder"));
        $input.addClass("placeholder");
      }
    }
  }).trigger("blur");

  // AJAX Subscription Form
  $('#signup-form').submit(function (e) {

    var $form = $(this);
    var timeout;

    // submit request
    $.getJSON(
      this.action + "?callback=?",
      $form.serialize(),
      function (data) {
        if (data.Status === 400) {
          // Find the inputs
          var $inputs = $form.find("p > *");          
          // Clear previous timeout if existing
          if (timeout) { clearTimeout(timeout); }
          // Add the animations and error display
          $inputs.removeClass("shake").addClass("shake error");
          // Remove the animations
          timeout = window.setTimeout(function() {
            $inputs.removeClass("shake error");
          }, 900);

        } else { // 200
          $form.find("p").hide();
          $form.prepend('<p class="message">We’ve got you. Thanks for your interest.</p>');
        }
      });

    return false;
   });

});