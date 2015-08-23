class QuestionsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :remove]

  def index
    render json: Question.all
  end

  def show
    question = Question.find(params[:id])
    render json: question
  end

  def create
    @question = current_user.questions.build(question_params)
    if @question.save
      render status: 200, json: {
        question: @question,
        message: "Your request was successful."
      }
    else
      render status: 400, json: {
        message: "Your request was not successful. Please try again."
      }
    end
  end

  def remove
    question = Question.find(params[:id])
    if question.destroy
      render status: 200, json: {
        message: "Your request was successful."
      }
    else
      render status: 400, json: {
        message: "Your request was not successful. Please try again."
      }
    end
  end

  private

  def question_params
    params.require(:question).permit(:content)
  end
end
