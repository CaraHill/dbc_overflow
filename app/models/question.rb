class Question < ActiveRecord::Base
  belongs_to :user

  def as_json(options = {})
    {
      id: id,
      content: content,
      user_name: user.name
    }
  end
end
