class Question < ActiveRecord::Base
  belongs_to :user
  has_many :answers

  def as_json(options = {})
    {
      id: id,
      content: content,
      user_name: user.name
    }
  end
end
