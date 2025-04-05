import csv
import re

input_file = 'subject_matter.csv'
output_file = 'processed_subjects.csv'

def clean_title(raw_title):
    # Remove all quotation marks and extra whitespace
    cleaned = raw_title.replace('"', '').strip()
    # If the title is all uppercase, convert to title case.
    if cleaned.isupper():
        cleaned = cleaned.title()
    return cleaned

with open(input_file, newline='', encoding='utf-8') as infile, \
     open(output_file, 'w', newline='', encoding='utf-8') as outfile:

    reader = csv.DictReader(infile)
    # Our new CSV will have these columns:
    fieldnames = ['id', 'title', 'season', 'episode', 'subject']
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    writer.writeheader()

    id_counter = 1
    for row in reader:
        # Process the EPISODE column (e.g., "S01E01")
        ep_str = row['EPISODE']
        match = re.match(r'S(\d+)E(\d+)', ep_str, re.IGNORECASE)
        if match:
            # Remove any leading zeros
            season = str(int(match.group(1)))
            episode = str(int(match.group(2)))
        else:
            season, episode = '', ''

        # Clean up the TITLE column
        title = clean_title(row['TITLE'])

        # Build the subject list:
        # We include a subject if its value is "1" and if its header doesn't contain "FRAME".
        subjects = []
        for key, value in row.items():
            if key in ['EPISODE', 'TITLE']:
                continue
            if value.strip() == '1' and 'FRAME' not in key.upper():
                # Convert the column name to a more readable form
                # (e.g., "BUSHES" becomes "Bushes", "DECIDUOUS" becomes "Deciduous")
                subjects.append(key.title())

        new_row = {
            'id': id_counter,
            'title': title,
            'season': season,
            'episode': episode,
            'subject': str(subjects)  # Stored as a string representation of a list
        }
        writer.writerow(new_row)
        id_counter += 1
