function QuestionView() {}

QuestionView.prototype = {
  newQuestionDiv: function() {
    var newQuestionDiv ='<div class="new-question"><a class="ask-question-button" href="">Ask Question</a>'+'<form class="new-question-form" method="post" action="/questions"><input type="text" name="question[content]" placeholder="Ask a Question"><input type="submit" value="Submit Question"></form>'+'<div class="questions-go-here"></div>'+'</div>';
    $('#ask_question').append(newQuestionDiv);
  },
  askQuestionButtonEventHandler: function() {
    $('#ask_question').on('click', '.ask-question-button', function(e) {
    e.preventDefault();
    var question = $(e.target).parent();
    var newQuestionForm = question.find('.new-question-form').show();
  });
  },
  askQuestionSubmitEventHandler: function(newQuestionFunction) {
    var that = this;
    $('#ask_question').on('submit', '.new-question-form', function(e) {
      e.preventDefault();
      var questionElement = $(e.target)
      questionElement.parent().find('.questions-go-here');
      newQuestionFunction(questionElement, that.askQuestion, that.askQuestionFailure)
    });
  },
  askQuestion: function(data, questionElement) {
    var question = data.question
    var questionId = question.id
    var questionDiv = '<div class="question" data-question-id="'+questionId+'">'+question.content+' - '+question.user_name+' <a class="delete-button" href="">Delete</a> '+'<a class="create-answer-button" href="">Answer this Question</a> '+'<form class="new-answer-form" method="post" action="/questions/"'+questionId+'"/answer"><input type="text" name="answer[content]" placeholder="Answer a Question"><input type="submit" value="Submit Answer"></form>'+'<a class="answers-button" href="">See Answers</a>'+'<div class="answers-go-here"></div>'+'</div>'
    $('#dbc_stack').append(questionDiv);
    alert("Success! Your question was added.");
    questionElement.find('input[type=text]').val("")
  },
  askQuestionFailure: function() {
    alert("Your request was not successful. Please try again.")
  },
  deleteQuestionEventHandler: function(deleteQuestion) {
    var that = this;
    $('#dbc_stack').on('click', '.delete-button', function(e) {
      e.preventDefault();
      var question = $(e.target).parent();
      var questionId = question.data('question-id');
      deleteQuestion(questionId, that.deleteQuestionSuccess, that.deleteQuestionFailure);
    });
  },
  deleteQuestionSuccess: function(question) {
    // $('.question').find('data[question-id="'+questionId+'"]').hide();
    question.hide();
  },
  deleteQuestionFailure: function() {
    alert("Your request was not successful. Please try again.")
  }
}
