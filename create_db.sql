-- Create Episode Table
CREATE TABLE episodes (
    episode_id SERIAL PRIMARY KEY,
    -- INT -> +1
    title VARCHAR(255) NOT NULL,
    season INT NOT NULL,
    episode_number INT NOT NULL,
    youtube_src VARCHAR(255),
    air_date DATE,
    img_src VARCHAR(255)
);
-- Create Colors Table
CREATE TABLE colors (
    color_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    hex_value VARCHAR(7) NOT NULL UNIQUE
);
-- Create Subjects Table
CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);
-- Create Episodes & Colors Join Table
CREATE TABLE episode_colors (
    episode_color_id SERIAL PRIMARY KEY,
    episode_id INT NOT NULL,
    color_id INT NOT NULL,
    FOREIGN KEY (episode_id) REFERENCES episodes(episode_id),
    FOREIGN KEY (color_id) REFERENCES colors(color_id)
);
-- Create Episodes & Subject Matter Join Table
CREATE TABLE episode_subjects (
    episode_subjects_id SERIAL PRIMARY KEY,
    episode_id INT NOT NULL,
    subject_id INT NOT NULL,
    FOREIGN KEY (episode_id) REFERENCES episodes(episode_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);