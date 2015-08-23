function QuestionsModel() {}

QuestionsModel.prototype = {
  getAllQuestions: function(allQuestionsSuccess, allQuestionsFailure) {
    $.ajax({
      url: "/questions",
      type: "GET",
      success: function(data) {
        allQuestionsSuccess(data);
      },
      failure: function() {
        allQuestionsFailure();
      }
    });
  }

}
