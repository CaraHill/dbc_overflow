class QuestionsController < ApplicationController

  def index
    @questions = Question.all
  end

  def question
    @question = Question.find(params[:id])
  end

  def new_question
    Question.create(question: params[:question], user_id: current_user.id)
    redirect root_path
  end
end
