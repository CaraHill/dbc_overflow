function QuestionsModel() {}

QuestionsModel.prototype = {
  getAllQuestions: function(allQuestionsSuccess, allQuestionsError) {
    $.ajax({
      url: "/questions",
      type: "GET",
      success: function(data) {
        allQuestionsSuccess(data);
      },
      error: function() {
        allQuestionsError();
      }
    });
  }

}
