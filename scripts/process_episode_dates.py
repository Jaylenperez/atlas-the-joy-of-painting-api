#!/usr/bin/env python3

import csv
import re
from datetime import datetime

input_file = 'episode_dates.txt'
output_file = 'processed_episode_dates.csv'

with open(input_file, 'r') as infile, open(output_file, 'w', newline='') as outfile:
    writer = csv.writer(outfile)

    # Updated header: added "year" and "month" columns after "air_date"
    writer.writerow(['id', 'title', 'air_date', 'year', 'month', 'notes'])

    # Read header line from the input file (if necessary)
    header = infile.readline().strip()

    id_counter = 1
    for line in infile:
        line = line.strip()
        if not line:
            continue  # skip blank lines
    
        pattern = r'^"(?P<title>.*?)"\s+\((?P<date>.*?)\)(?:\s+(?P<notes>.*))?$'
        match = re.match(pattern, line)
        if match:
            title = match.group('title')
            date_str = match.group('date')
            notes = match.group('notes') if match.group('notes') else ''
                
            try:
                # Convert the date string from "Month day, Year" to "YYYY-MM-DD"
                dt = datetime.strptime(date_str, '%B %d, %Y')
                air_date = dt.strftime('%Y-%m-%d')
                year = dt.year
                month = dt.strftime('%B')
            except ValueError:
                # If conversion fails, fallback to the original string and empty values for year and month
                air_date = date_str
                year = ''
                month = ''
                
            writer.writerow([id_counter, title, air_date, year, month, notes])
            id_counter += 1
        else:
            print(f"Line did not match the expected format: {line}")
