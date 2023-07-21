# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_07_20_120446) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "articles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "title", null: false
    t.text "body", null: false
    t.string "slug", null: false
    t.datetime "last_published_at"
    t.string "status", default: "draft", null: false
    t.uuid "category_id", null: false
    t.uuid "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "site_id", null: false
    t.integer "visit_count", default: 0, null: false
    t.index ["category_id"], name: "index_articles_on_category_id"
    t.index ["site_id"], name: "index_articles_on_site_id"
    t.index ["slug"], name: "index_articles_on_slug", unique: true
    t.index ["user_id"], name: "index_articles_on_user_id"
  end

  create_table "categories", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position"
    t.integer "articles_count"
    t.uuid "site_id", null: false
    t.index ["site_id"], name: "index_categories_on_site_id"
    t.index ["title"], name: "index_categories_on_title", unique: true
  end

  create_table "redirections", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "from", null: false
    t.text "to", null: false
    t.uuid "site_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["from"], name: "index_redirections_on_from", unique: true
    t.index ["site_id"], name: "index_redirections_on_site_id"
  end

  create_table "schedules", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "time", null: false
    t.string "event", null: false
    t.uuid "article_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["article_id"], name: "index_schedules_on_article_id"
  end

  create_table "sites", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "title", null: false
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "authentication_token"
    t.index ["authentication_token"], name: "index_sites_on_authentication_token", unique: true
    t.index ["title"], name: "index_sites_on_title", unique: true
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "site_id", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["site_id"], name: "index_users_on_site_id"
  end

  create_table "versions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "item_type", null: false
    t.uuid "item_id", null: false
    t.string "event", null: false
    t.string "whodunnit"
    t.text "object"
    t.datetime "created_at"
    t.index ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id"
  end

  add_foreign_key "articles", "categories"
  add_foreign_key "articles", "sites", on_delete: :cascade
  add_foreign_key "articles", "users"
  add_foreign_key "categories", "sites", on_delete: :cascade
  add_foreign_key "redirections", "sites", on_delete: :cascade
  add_foreign_key "schedules", "articles", on_delete: :cascade
  add_foreign_key "users", "sites", on_delete: :cascade
end
