class AnswersController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy]

  def index
    # question = Question.find(params[:question_id])
    # render json: question.answers
  end

  def create
    @answer = current_user.answers.build(answer_params.merge(question_id: params[:question_id]))
    if @answer.save
      render status: 200, json: {
        answer: @answer,
        message: "Your request was successful."
      }
    else
      render status: 400, json: {
        message: "Your request was not successful. Please try again."
      }
    end
  end

  def destroy
    question = Question.find(params[:question_id])
    answer = question.answers.find(params[:id])
    if current_user.id == answer.user_id
      if answer.destroy
        render status: 200, json: {
          message: "Your request was successful."
        }
      else
        render status: 400, json: {
          message: "Your request was not successful. Please try again."
        }
      end
    else
      render status: 400, json: {
        message: "Your request was not successful. Please try again."
      }
    end
  end

  private

  def answer_params
    params.require(:answer).permit(:content)
  end
end
