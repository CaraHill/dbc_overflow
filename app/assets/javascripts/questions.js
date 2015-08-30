$(document).ready(function() {

  var questionsView = new QuestionsView();
  var questionView = new QuestionView();
  var appView = new AppView();
  var questionsModel = new QuestionsModel();
  var questionModel = new QuestionModel();
  var answerView = new AnswerView();
  var answerModel = new AnswerModel();

  // could these activities happen in some sort of onInit() function of the View object?
  questionView.newQuestionDiv();

  questionView.askQuestionButtonEventHandler();

  appView.authenticationErrorAlert();

  questionsModel.getAllQuestions(questionsView.allQuestionsSuccess, questionsView.allQuestionsError);

  questionsView.allQuestionsDiv();

  questionView.showQuestionEventHandler(questionModel.showQuestion);

  questionView.askQuestionSubmitEventHandler(questionModel.newQuestion);

  questionView.deleteQuestionEventHandler(questionModel.deleteQuestion);

  answerView.newAnswerButtonEventHandler();

  answerView.newAnswerSubmitEventHandler(answerModel.addNewAnswer);

  answerView.deleteAnswerEventHandler(answerModel.deleteAnswer);

})
