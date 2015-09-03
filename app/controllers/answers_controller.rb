class AnswersController < ApplicationController
  # I'm not a huge fan of these before_action filters combined with :only or
  # :except. IMHO it makes code harder to read as the entry point for
  # execution of the response to a HTTP request is no longer the method.
  #
  # I think it is clearer to just invoke the filter method at the start of the
  # method e.g.
  #
  # def create
  #   authenticate_user!
  #   # ...
  # end
  #
  # It isn't a big deal here as your controller is fairly small but imagine
  # something like:
  #
  #   before_action :foo1 only: [:create, :destroy]
  #   before_action :foo2 only: [:destroy]
  #   before_action :foo4 except: [:create, :destroy]
  #   before_action :foo3 only: [:index]
  #   before_action :foo5 except: [:index, :destroy]
  #
  # It is now quite complex to understand what this controller does.

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
