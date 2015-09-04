class QuestionsController < ApplicationController

  def index
    render json: Question.all
  end

  def show
    question = Question.find(params[:id])
    answers = question.answers
    render json: {
      question: question,
      answer: answers
    }
  end

  def create
    authenticate_user!
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
    authenticate_user!
    question = Question.find(params[:id])

    if current_user.id == question.user_id
      remove_question_answers(question)
      question.destroy
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

  def remove_question_answers(question)
    Answer.where(question_id: question.id).destroy_all
  end
end
