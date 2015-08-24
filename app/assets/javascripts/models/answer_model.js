function AnswerModel() {}

AnswerModel.prototype = {
  addNewAnswer: function(e, questionId, newAnswerSuccess, newAnswerError) {
    $.ajax({
      url: "/questions/"+questionId+"/answers",
      type: "POST",
      data: $(e.target).serialize(),
      success: function(e) {
        newAnswerSuccess(e);
      },
      error: function() {
        newAnswerError();
      }
    });
  },

  deleteAnswer: function(questionId, answerId, answer, deleteAnswerSuccess, deleteAnswerError) {
    $.ajax({
      url: "/questions/"+questionId+"/answers/"+answerId,
      type: "DELETE",
      success: function() {
        deleteAnswerSuccess(answer);
      },
      error: function() {
        deleteAnswerError();
      }
    });
  }
}
