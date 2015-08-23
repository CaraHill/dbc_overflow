function AnswerModel() {}

AnswerModel.prototype = {
  addNewAnswer: function(e, questionId, newAnswerSuccess, newAnswerFailure) {
    $.ajax({
      url: "/questions/"+questionId+"/answers",
      type: "POST",
      data: $(e.target).serialize(),
      success: function(e) {
        newAnswerSuccess(e);
      },
      failure: function() {
        newAnswerFailure();
      }
    });
  },

  deleteAnswer: function(questionId, answerId, answer, deleteAnswerSuccess, deleteAnswerFailure) {
    $.ajax({
      url: "/questions/"+questionId+"/answers/"+answerId,
      type: "DELETE",
      success: function() {
        deleteAnswerSuccess(answer);
      },
      failure: function() {
        deleteAnswerFailure();
      }
    });
  }
}
