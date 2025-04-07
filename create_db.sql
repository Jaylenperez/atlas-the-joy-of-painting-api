-- Create Episode Table
CREATE TABLE episodes (
    id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    air_date DATE,
    year INT NOT NULL,
    month VARCHAR(50) NOT NULL,
    notes VARCHAR(50)
);
-- Create Colors Table
CREATE TABLE colors (
    id PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    season INT NOT NULL,
    episode INT NOT NULL,
    img_src TEXT,
    youtube_src TEXT,
    colors TEXT [],
    color_hex TEXT []
);
-- Create Subjects Table
CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    subject TEXT []
);
-- Create Episodes & Colors Join Table
CREATE TABLE episode_colors (
    episode_color_id PRIMARY KEY,
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