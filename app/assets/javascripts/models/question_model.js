function QuestionModel() {}

QuestionModel.prototype = {
  newQuestion: function(questionElement, askQuestionSuccess, askQuestionError) {
    $.ajax({
      url: "/questions",
      type: "POST",
      data: questionElement.serialize(),
      success: function(data) {
        askQuestionSuccess(data, questionElement);
      },
      error: function() {
        askQuestionerror();
      }
    });
  },
  showQuestion: function(questionId, showQuestionSuccess, showQuestionError, hideQuestionDiv, allQuestionsDiv) {
    $.ajax({
      url: "/questions/"+questionId,
      type: "GET",
      success: function(data) {
        showQuestionSuccess(data, hideQuestionDiv, allQuestionsDiv);
      },
      error: function() {
        showQuestionerror();
      }
    });
  },
  deleteQuestion: function(question, questionId, success, error) {
    $.ajax({
      url: "/questions/"+questionId,
      type: "DELETE",
      success: function() {
        success(question);
      },
      error: function() {
        error();
      }
    });
  }
}
