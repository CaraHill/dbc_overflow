function QuestionsView () {}

QuestionsView.prototype = {

  allQuestions: function(data) {
    for(var i=0; i< data.length; i++) {
        var question = data[i]
        var questionId = question.id
        var questionDiv =
        '<div class="question" data-question-id="'+questionId+'">'+question.content+' - '+question.user_name+' </div>'
        $('#dbc_stack').append(questionDiv);
      }
  },
  allQuestionsFailure: function() {
    alert("Your request was not successful. Please try again.")
  }
}
