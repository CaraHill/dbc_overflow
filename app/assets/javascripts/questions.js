$(document).ready(function() {

  var questionsView = new QuestionsView();
  var questionView = new QuestionView();
  var appView = new AppView();
  var questionsModel = new QuestionsModel();
  var questionModel = new QuestionModel();
  questionView.newQuestionDiv();
  questionView.askQuestionButtonEventHandler();
  appView.authenticationErrorAlert();

  questionsModel.getAllQuestions(questionsView.allQuestions, questionsView.allQuestionsFailure);

  questionView.askQuestionSubmitEventHandler(questionModel.newQuestion);

  questionView.deleteQuestionEventHandler(questionModel.deleteQuestion);

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

