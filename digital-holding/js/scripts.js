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

    // submit request
    $.getJSON(
      this.action + "?callback=?",
      $form.serialize(),
      function (data) {
        if (data.Status === 400) {
          // Shake
          var $p = $form.find("p");
          $p.removeClass("shake").addClass("shake").addClass("error");
          setTimeout(function() {
            $p.removeClass("shake").removeClass("error");
          }, 1000);

          $form.find("input.email").addClass("error");
        } else { // 200
          $form.find("p").hide();
          $form.append('<p class="message">We’ve got you. Thanks for your interest.</p>');
        }
      });

    return false;
   });

});