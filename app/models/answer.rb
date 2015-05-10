class Answer < ActiveRecord::Base
  belongs_to :user
  belongs_to :question

  def as_json(options = {})
    {
      id: id,
      content: content,
      user_name: user.name,
      question_id: question_id
    }
  end
end
