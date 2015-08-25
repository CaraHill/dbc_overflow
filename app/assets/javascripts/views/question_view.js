function QuestionView() {}

QuestionView.prototype = {
  newQuestionDiv: function() {
    var newQuestionDiv ='<div class="new-question"><a class="ask-question-button" href="">Ask Question</a>'+'<form class="new-question-form" method="post" action="/questions"><input type="text" name="question[content]" placeholder="Ask a Question"><input type="submit" value="Submit Question"></form>'+'<div class="questions-go-here"></div>'+'</div>';
    $('#ask_question').append(newQuestionDiv);
  },
  hideQuestionDiv: function() {
    $('#ask_question').hide();
  },
  askQuestionButtonEventHandler: function() {
    $('#ask_question').on('click', '.ask-question-button', function(e) {
    e.preventDefault();
    var question = $(e.target).parents('#ask_question');
    var newQuestionForm = question.find('.new-question-form').show();
  });
  },
  askQuestionSubmitEventHandler: function(newQuestionFunction) {
    var that = this;
    $('#ask_question').on('submit', '.new-question-form', function(e) {
      e.preventDefault();
      var questionElement = $(e.target)
      newQuestionFunction(questionElement, that.askQuestionSuccess, that.askQuestionError)
    });
  },
  askQuestionSuccess: function(data, questionElement) {
    var question = data.question
    var questionId = question.id
    var questionDiv = '<div class="question" data-question-id="'+questionId+'">'+question.content+' - '+question.user_name+' <a class="show-question" href="">Show</a> '+'</div>'
    $('#dbc_stack').append(questionDiv);
    alert("Success! Your question was added.");
    questionElement.find('input[type=text]').val("")
  },
  askQuestionError: function() {
    alert("Your request was not successful. Please try again.")
  },

  showQuestionEventHandler: function(showQuestion, allQuestionsDiv) {
    var that = this;
    $('#dbc_stack').on('click', '.show-question', function(e) {
      e.preventDefault();
      var question = $(e.target).parents('.question');
      var questionId = question.data('question-id');
      showQuestion(questionId, that.showQuestionSuccess, that.showQuestionError, that.hideQuestionDiv, allQuestionsDiv)
    });
  },

  showQuestionSuccess: function(data, questionId, hideQuestionDiv, allQuestionsDiv) {
    var question = data;
    var questionId = question.id
    var questionDiv = '<div class="question" data-question-id="'+questionId+'">'+question.content+' - '+question.user_name+' <a class="delete-button" href="">Delete</a> '+'<div class="new-answer"><a class="create-answer-button" href="">Answer this Question</a>'+'<form class="new-answer-form" method="post" action="/questions/'+questionId+'/answers"><input type="text" name="answer[content]" placeholder="Answer a Question"><input type="submit" value="Submit Answer"></form>'+' <a class="answers-button" href="">See Answers</a>'+'<div class="answers-go-here"></div>'+'</div>'
    $('#dbc_stack').empty();
    $('#dbc_stack').append(questionDiv);
    var answersDiv = $('#dbc_stack').find('.answers-go-here');
    var answers = data.answer
    for(var i=0; i< answers.length; i++) {
      var answer = answers[i];
      var answerId = answer.id;
      var answerDiv = '<div class="question-answers" data-answer-id="'+answerId+'">'+answer.content+' - '+answer.user_name+' <a class="answer-delete-button" href="">Delete</a>'+'</div>'
      answersDiv.append(answerDiv);
    }
    QuestionView.hideQuestionDiv;
    QuestionsView.allQuestionsDiv;
  },

  showQuestionError: function() {
    alert("Your request was not successful. Please try again.");
  },

  deleteQuestionEventHandler: function(deleteQuestion) {
    var that = this;
    $('#dbc_stack').on('click', '.delete-button', function(e) {
      e.preventDefault();
      var question = $(e.target).parents('.question');
      var questionId = question.data('question-id');
      deleteQuestion(question, questionId, that.deleteQuestionSuccess, that.deleteQuestionError);
    });
  },
  deleteQuestionSuccess: function(question) {
    question.hide();
  },
  deleteQuestionError: function() {
    alert("You do not have permission to do that.")
  }
}
