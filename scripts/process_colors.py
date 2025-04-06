#!/usr/bin/env python3

import csv
import ast

input_file = 'colors_used.csv'
output_file = 'processed_colors_used.csv'

# Define the output columns (adding just one extra field for hex codes)
fieldnames = ['id', 'title', 'season', 'episode', 'img_src', 'youtube_src', 'colors', 'color_hex']

with open(input_file, 'r', newline='', encoding='utf-8') as infile, \
     open(output_file, 'w', newline='', encoding='utf-8') as outfile:

    reader = csv.DictReader(infile)
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    
    writer.writeheader()

    for row in reader:
        new_row = {
            'id': row.get('id', ''),
            'title': row.get('painting_title', ''),
            'season': row.get('season', ''),
            'episode': row.get('episode', ''),
            'img_src': row.get('img_src', ''),
            'youtube_src': row.get('youtube_src', '')
        }
        
        # Process the 'colors' field
        try:
            colors_list = ast.literal_eval(row.get('colors', ''))
            colors_list = [color.strip() for color in colors_list]
        except Exception:
            colors_list = []
        new_row['colors'] = ', '.join(colors_list)
        
        # Process the 'color_hex' field in the same way
        try:
            hex_list = ast.literal_eval(row.get('color_hex', ''))
            hex_list = [hex_code.strip() for hex_code in hex_list]
        except Exception:
            hex_list = []
        new_row['color_hex'] = ', '.join(hex_list)
        
        writer.writerow(new_row)
