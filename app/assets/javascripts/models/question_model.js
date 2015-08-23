function QuestionModel() {}

QuestionModel.prototype = {
  newQuestion: function(questionElement, askQuestionSuccess, askQuestionFailure) {
    $.ajax({
      url: "/questions",
      type: "POST",
      data: questionElement.serialize(),
      success: function(data) {
        askQuestionSuccess(data, questionElement);
      },
      failure: function() {
        askQuestionFailure();
      }
    });
  },
  deleteQuestion: function(question, questionId, success, failure) {
    $.ajax({
      url: "/questions/"+questionId,
      type: "DELETE",
      success: function() {
        success(question);
      },
      failure: function() {
        failure();
      }
    });
  }
}
