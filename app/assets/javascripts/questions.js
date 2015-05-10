$(document).ready(function() {

  var questions = new QuestionsView();
  var questionView = new QuestionView();
  var appView = new AppView();
  questionView.newQuestionDiv();
  questionView.askQuestionButtonEventHandler();
  appView.authenticationErrorAlert();

  $.ajax({
    url: "/questions",
    type: "GET",
    success: function(data) {
      questions.allQuestions(data);
    },
    failure: function() {
      questions.allQuestionsFailure();
    }
  });

  var newQuestion = function(questionElement) {
    $.ajax({
      url: "/questions",
      type: "POST",
      data: questionElement.serialize(),
      success: function(data) {
        questionView.askQuestion(data, questionElement);
      },
      failure: function() {
        questionView.askQuestionFailure();
      }
    });
  };

  questionView.askQuestionSubmitEventHandler(newQuestion);

  var deleteQuestionRequest = function(questionElement, questionId) {
    $.ajax({
      url: "/questions/"+questionId,
      type: "DELETE",
      success: function() {
        questionView.deleteQuestion(questionElement);
      },
      failure: function() {
        questionView.deleteQuestionFailure();
      }
    })
  }

  questionView.deleteQuestionEventHandler(deleteQuestionRequest);

  $('#dbc_stack').on('click', '.answers-button', function(e) {
    e.preventDefault();
    var question = $(e.target).parent().parent();
    var questionId = question.data('question-id');
    var answers = question.find('.answers-go-here');
    $.ajax({
      url: "/questions/"+questionId+"/answers",
      type: "GET",
      success: function(data) {
        for(var i=0; i< data.length; i++) {
          var answer = data[i];
          var answerId = answer.id;
          var answerDiv = '<div class="question-answers" data-answer-id="'+answerId+'">'+answer.content+', '+answer.user_name+' <a class="answer-delete-button" href="">Delete</a>'+'</div>'
          answers.append(answerDiv);
        }
      },
      failure: function() {
        alert("Your request was not successful. Please try again.")
      }
    })
  });

  $('#dbc_stack').on('click', '.create-answer-button', function(e) {
    e.preventDefault();
    var question = $(e.target).parent();
    var newAnswerForm = question.find('.new-answer-form').show();
  })

  $('#dbc_stack').on('submit', '.new-answer-form', function(e) {
    e.preventDefault();
    var question = $(e.target).parent().parent();
    var questionId = question.data('question-id');
    var newAnswer = question.find('.answers-go-here');
    $.ajax({
      url: "/questions/"+questionId+"/answers",
      type: "POST",
      data: $(e.target).serialize(),
      success: function() {
        alert("Success! Your question was added.");
        $(e.target).find('input[type=text]').val("")
      },
      failure: function() {
        alert("Your request was not successful. Please try again.")
      }
    })
  });

  $('#dbc_stack').on('click', '.answer-delete-button', function(e) {
    e.preventDefault();
    var question = $(e.target).parent().parent().parent().parent();
    var questionId = question.data('question-id');
    var answer = question.find('.question-answers');
    var answerId = answer.data('answer-id');
    $.ajax({
      url: "/questions/"+questionId+"/answers/"+answerId,
      type: "DELETE",
      success: function() {
        answer.hide();
      },
      failure: function() {
        alert("Your request was not successful. Please try again.")
      }
    })
  })

})

