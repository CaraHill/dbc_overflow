class AnswersController < ApplicationController

  def index
  end

  def create
    authenticate_user!
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
    authenticate_user!
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
