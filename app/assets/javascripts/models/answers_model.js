function AnswersModel () {}

AnswersModel.prototype = {
  getAllAnswers: function(questionId, allAnswersSuccess, allAnswersFailure) {
    $.ajax({
      url: "/questions/"+questionId+"/answers",
      type: "GET",
      success: function(data) {
        allAnswersSuccess(data);
      },
      failure: function() {
        allAnswersFailure();
      }
    });
  }
}
