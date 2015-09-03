describe User do

  # I'm not a fan of using a factory to create the object under test as it is a
  # bit too magical.
  #
  # 1. Part of what I read tests for is for examples of how to intantiate these
  #    objects
  # 2. I can't directly see what state has been setup in the user e.g. where
  #    did 'test@example.com` come from?
  #
  # Factories are fine for the "supporting cast" of chacters in a test but the
  # star of the test (the subject) should be front and center :-)
  #
  # Aside: code duplication is more ok in tests than application code. The key
  # outcome of a test is that the next dev can understand it as quickly as
  # possible and sometimes dupliating things is the best way to achieve that.
  # Your taste will guide you here but in general don't DRY test code so much
  # that it would chafe... :-)
  #
  before(:each) { @user = FactoryGirl.create(:user) }

  subject { @user }

  it { should respond_to(:email) }

  it "#email returns a string" do
    expect(@user.email).to match 'test@example.com'
  end

end
