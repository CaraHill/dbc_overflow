module ApplicationHelper

  def flash_class_for(flash_type)
    {
      success: "alert-success",
      error: "alert_danger",
      alert: "alert-warning",
      notice: "alert-info"
    }[flash_type]
  end
end
