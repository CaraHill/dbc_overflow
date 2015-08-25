function AnswerView() {

}

AnswerView.prototype = {
  newAnswerButtonEventHandler: function() {
    $('#dbc_stack').on('click', '.create-answer-button', function(e) {
      e.preventDefault();
      var question = $(e.target).parents('.question');
      question.find('.new-answer-form').show();
    });
  },

  newAnswerSubmitEventHandler: function(addNewAnswer) {
    var that = this;
    $('#dbc_stack').on('submit', '.new-answer-form', function(e) {
      e.preventDefault();
      var question = $(e.target).parents('.question');
      var questionId = question.data('question-id');
      addNewAnswer(e, questionId, that.newAnswerSuccess, that.newAnswerError);
    });
  },

  newAnswerSuccess: function(data) {
    var answer = data.answer
    var answerId = answer.id
    var answerDiv = '<div class="question-answers" data-question-id="'+answerId+'">'+answer.content+' - '+answer.user_name+' <a class="answer-delete-button" href="">Delete</a> '+'</div>'
    $('.answers-go-here').append(answerDiv);
    alert("Success! Your answer was added.");
    $('.new-answer-form').find('input[type=text]').val("");
    $('.answers-go-here').hide().show().fadeIn('fast');
  },

  newAnswerError: function() {
    alert("Your request was not successful. Please try again.");
  },

  deleteAnswerEventHandler: function(deleteAnswer) {
    var that = this;
    $('#dbc_stack').on('click', '.answer-delete-button', function(e) {
      e.preventDefault();
      var $element = $(e.target);
      var question = $element.parents('.question');
      var questionId = question.data('question-id');
      var answer = $element.parent();
      var answerId = answer.data('answer-id');
      deleteAnswer(questionId, answerId, answer, that.deleteAnswerSuccess, that.deleteAnswerError);
    });
  },

  deleteAnswerSuccess: function(answer) {
    answer.hide();
  },
  deleteAnswerError: function() {
    alert("You do not have permission to do that.");
  }
}
