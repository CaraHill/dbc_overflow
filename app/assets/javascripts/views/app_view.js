function AppView() {}

AppView.prototype = {
  authenticationErrorAlert: function() {
    $(document).ajaxError(function (e, xhr, settings) {
        if (xhr.status == 401) {
          alert("You need to sign in before you can complete this request.");
          location.reload();
        }
    });
  }
}