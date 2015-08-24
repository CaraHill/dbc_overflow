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
  showQuestion: function(questionId, showQuestionSuccess, showQuestionFailure, hideQuestionDiv, allQuestionsDiv) {
    $.ajax({
      url: "/questions/"+questionId,
      type: "GET",
      success: function(data) {
        showQuestionSuccess(data, hideQuestionDiv, allQuestionsDiv);
      },
      failure: function() {
        showQuestionFailure();
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
