import os
import csv
import json

MY_PATH = os.path.dirname(os.path.realpath(__file__))
CSV_FILE = os.path.join(MY_PATH, '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba__2024_03_10_03_30_1_984.csv')
# https://data.gov.il/dataset/citiesandsettelments/resource/5c78e9fa-c2e2-4771-93ff-7f400a12f7ba

class LocationHelper(object):

    def __init__(self):
        # read from csv file
        self.cities = {}
        self.load_from_csv(CSV_FILE, encoding='windows-1255')


    def search_location(self, text: str):
        # get cities that starts with the text in key
        results = []
        for key in self.cities:
            if key.startswith(text):
                results.append(self.cities[key])
        return results

        
    def load_from_csv(self, file_path, encoding='windows-1255'):
        with open(file_path, 'r', encoding=encoding) as file:
            reader = csv.DictReader(file)
            for row in reader:
                self.cities[row['שם_ישוב']] = {
                        'id': row['סמל_ישוב'],
                        'name': row['שם_ישוב'],
                        #'sub_district_id': row['סמל_נפה'],
                        #'sub_district_name': row['שם_נפה'],
                        #'district_id': row['סמל_לשכת_מנא'],
                        #'district_name': row['לשכה'],
                        #'council_id': row['סמל_מועצה_איזורית'],
                        #'council_name': row['שם_מועצה'],
                    }
                