function AnswersView() {}

AnswersView.prototype  =  {

  allQuestionAnswersEventHandler: function(getallAnswers) {
    $('#dbc_stack').on('click', '.answers-button', function(e) {
      e.preventDefault();
      var question = $(e.target).parent().parent();
      var questionId = question.data('question-id');
      var answers = question.find('.answers-go-here');
      getallAnswers(questionId, this.allAnswersSuccess, this.allAnswersFailure);
    });
  },

  allAnswersSuccess: function(data) {
    for(var i=0; i< data.length; i++) {
      var answer = data[i];
      var answerId = answer.id;
      var answerDiv = '<div class="question-answers" data-answer-id="'+answerId+'">'+answer.content+' - '+answer.user_name+' <a class="answer-delete-button" href="">Delete</a>'+'</div>'
      answers.append(answerDiv);
    }
  },

  allAnswersFailure: function() {
    alert("Your request was not successful. Please try again.")
  }
}
