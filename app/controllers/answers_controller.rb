class AnswersController < ApplicationController
  before_action :authenticate_user!, only: [:create, :remove]

  def show
    question = Question.find(params[:id])
    render json: Answer.where(question_id: question.id)
  end
end
