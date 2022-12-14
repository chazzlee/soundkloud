# frozen_string_literal: true

replies.each do |reply|
  json.partial! 'api/replies/reply', reply:
end
