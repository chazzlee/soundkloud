# frozen_string_literal: true

genres.each do |genre|
  json.set! genre.id do
    json.extract! genre, :id, :label, :name
  end
end
