function QuestionsModel() {}

QuestionsModel.prototype = {
  getAllQuestions: function(success, failure) {
    $.ajax({
      url: "/questions",
      type: "GET",
      success: function(data) {
        success(data);
      },
      failure: function() {
        failure();
      }
    });
  }

}