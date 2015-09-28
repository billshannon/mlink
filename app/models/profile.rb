class Profile < ActiveRecord::Base
  belongs_to :user

  validates :first_name, :last_name, presence: true, length: { maximum: 50 }
  has_attached_file :avatar, :styles => {:medium => "300x300>", :thumb => "100x100>"}, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
end
