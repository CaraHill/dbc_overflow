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

    # nested if-else is a bit of a code smell. It increases the no. of possible
    # paths of execution in your method. A good way to visualise this is to
    # draw a flow chart
    # (https://en.wikipedia.org/wiki/Flowchart#/media/File:LampFlowchart.svg)
    # of the possible pathways through this method - notice the effect that
    # each if-else has on the graph. When you are testing a method you will
    # want to (eventually) have tests that trigger all of these possible paths.
    # If you are anything like me, you will notice that the no. of possible
    # paths through your method is higher than you think!
    #
    # All this makes if-else something we want to refactor away from. Note that
    # refactoring does not change the no. of possible paths of execution - it
    # just surfaces them better for our brains to reason about.
    #
    if current_user.id == question.user_id
      Answer.where(question_id: question.id).destroy_all
      if question.destroy
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

  def question_params
    params.require(:question).permit(:content)
  end
end
