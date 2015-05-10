function QuestionModel() {}

QuestionModel.prototype = {
  newQuestion: function(questionElement, success, failure) {
    $.ajax({
      url: "/questions",
      type: "POST",
      data: questionElement.serialize(),
      success: function(data) {
        success(data, questionElement);
      },
      failure: function() {
        failure();
      }
    });
  },
  deleteQuestion: function(questionElement, questionId, success, failure) {
    $.ajax({
      url: "/questions/"+questionId,
      type: "DELETE",
      success: function() {
        success(questionElement);
      },
      failure: function() {
        failure();
      }
    });
  }
}