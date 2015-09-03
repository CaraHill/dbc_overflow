# In general there are 3 categories of helpers you can create
#
# 1. a helper used in the views of just one contoller
# 2. a helper used in the views of *all* contoller
# 3. a helper used in the views of more than 1 but not all contoller
#
# Rails gives you places to put helpers of type 1. and 2. but nowhere for 3.
# Unfortunately 3. is probably the most common kind of helper. For this reason
# I put all helpers in application_helper.rb and if/when it starts to get too
# big I refactor based on the methods I have in there. I find this makes
# helpers of type 3 (the most common kind) easier to find.
#
module QuestionsHelper
end
