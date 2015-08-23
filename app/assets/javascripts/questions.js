$(document).ready(function() {

  var questionsView = new QuestionsView();
  var questionView = new QuestionView();
  var appView = new AppView();
  var questionsModel = new QuestionsModel();
  var questionModel = new QuestionModel();
  var answersView = new AnswersView();
  var answerView = new AnswerView();
  var answersModel = new AnswersModel();
  var answerModel = new AnswerModel();

  questionView.newQuestionDiv();

  questionView.askQuestionButtonEventHandler();

  appView.authenticationErrorAlert();

  questionsModel.getAllQuestions(questionsView.allQuestionsSuccess, questionsView.allQuestionsFailure);

  questionView.askQuestionSubmitEventHandler(questionModel.newQuestion);

  questionView.deleteQuestionEventHandler(questionModel.deleteQuestion);

  answersView.allQuestionAnswersEventHandler(answersModel.getAllAnswers);

  answerView.newAnswerButtonEventHandler();

  answerView.newAnswerSubmitEventHandler(answerModel.addNewAnswer);

  answerView.deleteAnswerEventHandler(answerModel.deleteAnswer);

})
