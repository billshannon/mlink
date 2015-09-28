class PagesController < ApplicationController
  def home
    # @basic_plan = Plan.find(1)
    # @pro_plan = Plan.find(2)
    @basic_plan = Plan.find(params[:id])
    @pro_plan = Plan.find(params[:id])

  end
  def about
  end
end
