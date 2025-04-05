import csv

colors_file = 'processed_colors_used.csv'
episode_dates_file = 'processed_episode_dates.csv'
subjects_file = 'processed_subjects.csv'
output_file = 'clean_data.csv'

# Read processed_colors_used.csv into a dict keyed by id
colors_data = {}
with open(colors_file, newline='', encoding='utf-8') as cf:
    reader = csv.DictReader(cf)
    for row in reader:
        colors_data[row['id']] = row

# Read processed_episode_dates.csv into a dict keyed by id
episode_data = {}
with open(episode_dates_file, newline='', encoding='utf-8') as ef:
    reader = csv.DictReader(ef)
    for row in reader:
        episode_data[row['id']] = row

# Read processed_subjects.csv into a dict keyed by id
subjects_data = {}
with open(subjects_file, newline='', encoding='utf-8') as sf:
    reader = csv.DictReader(sf)
    for row in reader:
        subjects_data[row['id']] = row

# Get the union of all IDs from the three files
all_ids = set(colors_data.keys()) | set(episode_data.keys()) | set(subjects_data.keys())

# Define the output column order
output_fieldnames = ['id', 'title', 'season', 'episode', 'air_date', 'subject', 'colors', 'img_src', 'youtube_src', 'notes']

with open(output_file, 'w', newline='', encoding='utf-8') as outf:
    writer = csv.DictWriter(outf, fieldnames=output_fieldnames)
    writer.writeheader()

    # Sort IDs numerically if possible (they are assumed to be numbers)
    for id_key in sorted(all_ids, key=lambda x: int(x)):
        # Get rows from each file; use empty dict if a row is missing
        color_row = colors_data.get(id_key, {})
        episode_row = episode_data.get(id_key, {})
        subject_row = subjects_data.get(id_key, {})

        # Determine the title - choose from one of the files that has it (they should be the same)
        title = color_row.get('title') or subject_row.get('title') or episode_row.get('title', '')

        # For season and episode, use data from either colors or subjects file.
        season = color_row.get('season') or subject_row.get('season', '')
        episode = color_row.get('episode') or subject_row.get('episode', '')

        # air_date and notes come from the episode dates file
        air_date = episode_row.get('air_date', '')
        notes = episode_row.get('notes', '')

        # subject from the subjects file
        subject = subject_row.get('subject', '')

        # colors, img_src, and youtube_src from the colors file
        colors = color_row.get('colors', '')
        img_src = color_row.get('img_src', '')
        youtube_src = color_row.get('youtube_src', '')

        # Create the merged row
        merged_row = {
            'id': id_key,
            'title': title,
            'season': season,
            'episode': episode,
            'air_date': air_date,
            'subject': subject,
            'colors': colors,
            'img_src': img_src,
            'youtube_src': youtube_src,
            'notes': notes
        }

        writer.writerow(merged_row)
