# I like how you have used a model here for the seed process - it will make it
# much easier to test your seed process. FYI this is a good pattern to use with
# rake tasks too - make a model to do the work and just have a simple task that
# kicks it off
#
# IMHO is that service objects can just live in app/models but that's more of a
# personal taste thing and many would do as you have done here and put them in
# a separate folder. A small note of caution might be around the word
# "Service".
#
# The object you have here is a "service object" in the design pattern sense of
# the word (i.e. a object with a single public "do it!" method. Be careful with
# organising classes in the system based on design pattern as that can change
# over time e.g. what if in future CreateAdminService evolves to use a
# different pattern? The history of ruby has a few famous instances of this
# naming not really working out e.g.
#
# * the DataMapper gem is not really an implementation of the "data mapper" pattern
# * ActiveRecord gem is only kinda-sorta the "active record" design pattern
#
# There is also a reading of "services" as "things that do stuff for my
# system". "things that do stuff for my system" is pretty much what *every*
# class in your system is so I don't favour using "services" in the second
# sense of the word as it seems like its playing favourites in a confusing way.
#
# All of which makes me just put things in app/models but YMMV :-)
#
class CreateAdminService
  def call
    user = User.find_or_create_by!(email: Rails.application.secrets.admin_email) do |user|
        user.password = Rails.application.secrets.admin_password
        user.password_confirmation = Rails.application.secrets.admin_password
      end
  end
end
