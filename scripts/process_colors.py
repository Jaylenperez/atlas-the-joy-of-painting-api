#!/usr/bin/env python3

import csv
import ast

# Update these paths according to your repo structure:
input_file = 'colors_used.csv'
output_file = 'processed_colors_used.csv'

fieldnames = ['id', 'title', 'season', 'episode', 'img_src', 'youtube_src', 'colors']

with open(input_file, 'r', newline='', encoding='utf-8') as infile, \
     open(output_file, 'w', newline='', encoding='utf-8') as outfile:

    reader = csv.DictReader(infile)
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    
    # Write the new header row
    writer.writeheader()

    for row in reader:
        # Rename the 'painting_title' column to 'title'
        title = row.get('painting_title', '')
        
        # Extract other required fields
        new_row = {
            'id': row.get('id', ''),
            'title': title,
            'season': row.get('season', ''),
            'episode': row.get('episode', ''),
            'img_src': row.get('img_src', ''),
            'youtube_src': row.get('youtube_src', ''),
        }
        
        # Clean up the 'colors' column
        raw_colors = row.get('colors', '')
        try:
            # Convert the string representation of a list to an actual list
            colors_list = ast.literal_eval(raw_colors)
            # Remove unnecessary newline characters and extra whitespace from each color name
            colors_list = [color.replace('\r', '').replace('\n', '').strip() for color in colors_list]
        except Exception as e:
            # In case of any error, default to an empty list or keep the raw string
            colors_list = []
        
        # Store the cleaned colors as a string representation of a list
        new_row['colors'] = ', '.join(colors_list)
        
        # Write the cleaned row with only the desired columns
        writer.writerow(new_row)
