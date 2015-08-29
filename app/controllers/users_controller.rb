class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    # The usage of unless here is fine but in general usage of `unless` is
    # something to be careful of. `unless` reads great when it is used in the
    # "single line" form e.g.
    #
    #   do_thing unless other_thing?
    #
    # but it can be difficult to reason about in block form. In particular
    # unless-else should be avoided (try using it in a sentence!).
    #
    # Notice the difference in how this reads
    #
    #   redirect_to :back, :alert => "Access denied." unless @user == current_user
    #
    # vs the block form.
    #
    # I tend to prefer "positive" statements in conditional expressions. It is
    # often helpful to write a small "predicate" method (a method whose name
    # ends in ? and returns a boolean) to clean up some logic e.g.
    #
    # Consider some logic:
    #
    #   unless @thing.author.name == current_user.name
    #     do_stuff(@thing)
    #   end
    #
    # vs
    #
    #   def current_user_is_not_author_of?(thing)
    #     thing.author.name == current_user.name
    #   end
    #
    #   if current_user_is_not_author_of?(@thing)
    #     do_stuff(@thing)
    #   end
    #
    # or even
    #
    #   do_stuff(@thing) if current_user_is_not_author_of?(@thing)
    #
    # Your instincts for good writing will help make choices here. Express it
    # in whatever way would be the clearest if you were to say it out loud :-)
    #
    unless @user == current_user
      redirect_to :back, :alert => "Access denied."
    end
  end

end
