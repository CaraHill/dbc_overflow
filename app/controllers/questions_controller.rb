class QuestionsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :remove]

  def index
    render json: Question.all
  end

  def show
    @question = Question.find(params[:id])
    if @question
      render status: 200, json: {
        question: question,
        message: "Your request was successful."
      }
    else
      render status: 404, json: {
        message: "Your request was not successful. Please try again."
      }
    end
  end

  def new
    render json: Question.new
  end

  def create
    @question = Question.new(question_params)
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
    params.require(:question).permit(:content).merge(user_id: current_user.id)
  end
end
