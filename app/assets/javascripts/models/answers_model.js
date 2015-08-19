function AnswersModel () {}

AnswersModel.prototype = {
  getAllAnswers: function(questionId, answers, allAnswersSuccess, allAnswersFailure) {
    $.ajax({
      url: "/questions/"+questionId+"/answers",
      type: "GET",
      success: function(data) {
        allAnswersSuccess(data, answers);
      },
      failure: function() {
        allAnswersFailure();
      }
    });
  }
}
