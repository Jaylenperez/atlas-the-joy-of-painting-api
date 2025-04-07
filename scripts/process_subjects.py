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
    fieldnames = ['id', 'title', 'subject']
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    writer.writeheader()

    id_counter = 1
    for row in reader:
        # Clean up the TITLE column
        title = clean_title(row['TITLE'])

        # Build the subject list:
        # We include a subject if its value is "1" and if its header doesn't contain "FRAME".
        subjects = []
        for key, value in row.items():
            if key in ['EPISODE', 'TITLE']:
                continue
            if value.strip() == '1' and 'FRAME' not in key.upper():
                subjects.append(key.title())
        
        subject_str = ', '.join(subjects)

        new_row = {
            'id': id_counter,
            'title': title,
            'subject': subject_str
        }
        writer.writerow(new_row)
        id_counter += 1
