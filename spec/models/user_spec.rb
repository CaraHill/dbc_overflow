describe User do
  before(:each) { @user = User.create(name: "George McGeorge", email: "george@george.com", password: "georgeisthebest") }

  subject { @user }

  it { should respond_to(:email) }

  it "#email returns a string" do
    expect(@user.email).to match 'george@george.com'
  end
end
