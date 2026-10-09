-- Schema for the admin-editable content backend (PHP + MySQL, see backend/README.md).
-- Replaces what used to be hardcoded in src/data/restaurants.ts and src/data/menu.ts.

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS restaurants (
  id              VARCHAR(50)  PRIMARY KEY,       -- e.g. "ekranidze"
  sort_order      INT          NOT NULL DEFAULT 0, -- left-to-right order in the header switcher
  path            VARCHAR(100) NOT NULL,           -- e.g. "/ekranidze"
  name            VARCHAR(100) NOT NULL,
  short_label     VARCHAR(100) NOT NULL,
  logo_image      VARCHAR(255) NULL,               -- /logos/... served from the static site
  header_icon     VARCHAR(255) NULL,
  tone            ENUM('warm','clay','olive') NOT NULL DEFAULT 'warm',
  badge           VARCHAR(200) NOT NULL DEFAULT '',
  hero_heading    VARCHAR(255) NOT NULL DEFAULT '',
  hero_text       TEXT NOT NULL,
  about_heading   VARCHAR(255) NOT NULL DEFAULT '',
  rating_value    VARCHAR(10)  NOT NULL DEFAULT '—', -- "4.8" or "—" while unknown; never invent one
  rating_updated_at DATETIME NULL,                 -- last time the Yandex scraper touched this
  yandex_reviews_url VARCHAR(255) NULL,             -- link shown next to the rating
  phone           VARCHAR(50)  NOT NULL DEFAULT '',
  phone_href      VARCHAR(50)  NOT NULL DEFAULT '',
  telegram        VARCHAR(255) NULL,
  legal_info      VARCHAR(255) NOT NULL DEFAULT '',
  is_placeholder  TINYINT(1)   NOT NULL DEFAULT 0,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS restaurant_about_paragraphs (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id VARCHAR(50) NOT NULL,
  sort_order    INT NOT NULL DEFAULT 0,
  body          TEXT NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS restaurant_amenities (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id VARCHAR(50) NOT NULL,
  sort_order    INT NOT NULL DEFAULT 0,
  label         VARCHAR(150) NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS restaurant_addresses (
  id            VARCHAR(100) PRIMARY KEY,          -- e.g. "ekranidze-main"
  restaurant_id VARCHAR(50) NOT NULL,
  sort_order    INT NOT NULL DEFAULT 0,
  label         VARCHAR(100) NULL,                 -- e.g. "Работает" / "Откроется позже"
  address_text  VARCHAR(255) NOT NULL,
  lon           DECIMAL(10,6) NULL,                -- Yandex Maps' own [lon, lat] order
  lat           DECIMAL(10,6) NULL,
  yandex_url    VARCHAR(255) NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS menu_categories (
  restaurant_id VARCHAR(50) NOT NULL,
  id            VARCHAR(100) NOT NULL,             -- unique within a restaurant, not globally
  sort_order    INT NOT NULL DEFAULT 0,
  title         VARCHAR(150) NOT NULL,
  menu_group    ENUM('food','drinks') NOT NULL DEFAULT 'food',
  PRIMARY KEY (restaurant_id, id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS menu_items (
  restaurant_id VARCHAR(50) NOT NULL,
  id            VARCHAR(100) NOT NULL,             -- unique within a restaurant, not globally
  category_id   VARCHAR(100) NOT NULL,
  sort_order    INT NOT NULL DEFAULT 0,
  name          VARCHAR(255) NOT NULL,
  description   TEXT NULL,
  weight        VARCHAR(50) NULL,                  -- absent for a few addon lines (tea/coffee extras)
  price         INT NOT NULL,
  tone          ENUM('warm','clay','olive') NOT NULL DEFAULT 'warm',
  image         VARCHAR(255) NULL,
  PRIMARY KEY (restaurant_id, id),
  FOREIGN KEY (restaurant_id, category_id)
    REFERENCES menu_categories(restaurant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Free-form extra sections an admin can add without a code change — rendered
-- as a simple heading + body block in a chosen spot on the page.
CREATE TABLE IF NOT EXISTS custom_sections (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id VARCHAR(50) NOT NULL,
  sort_order    INT NOT NULL DEFAULT 0,
  placement     ENUM('after_hero','after_menu','after_about','after_delivery')
                NOT NULL DEFAULT 'after_about',
  title         VARCHAR(255) NOT NULL,
  body          TEXT NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Every checkout submission, whether or not Telegram delivery succeeded —
-- so a restaurant with no bot configured yet still has a record of orders
-- instead of them vanishing (see backend/admin/orders.php).
CREATE TABLE IF NOT EXISTS orders (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id     VARCHAR(50) NOT NULL,
  customer_name     VARCHAR(255) NOT NULL,
  customer_phone    VARCHAR(50) NOT NULL,
  fulfillment       VARCHAR(20) NOT NULL,
  address           VARCHAR(255) NULL,
  payment           VARCHAR(20) NOT NULL,
  comment           TEXT NULL,
  items_json        TEXT NOT NULL,
  total_price       INT NOT NULL,
  telegram_delivered TINYINT(1) NOT NULL DEFAULT 0,
  created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS admin_users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,              -- PHP password_hash(), bcrypt
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
