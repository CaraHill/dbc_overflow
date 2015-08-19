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
  }
}
