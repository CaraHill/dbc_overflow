function AnswersModel () {}

AnswersModel.prototype = {
  getAllAnswers: function(questionId, answers, allAnswersSuccess, allAnswersError) {
    $.ajax({
      url: "/questions/"+questionId+"/answers",
      type: "GET",
      success: function(data) {
        allAnswersSuccess(data, answers);
      },
      error: function() {
        allAnswersError();
      }
    });
  }
}
