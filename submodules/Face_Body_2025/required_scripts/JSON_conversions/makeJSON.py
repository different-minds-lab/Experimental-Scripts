import csv

def readCSV(filename):
    with open(filename) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        headers = []
        print("[")
        for row in csv_reader:
            if line_count == 0:
                for item in row:
                    headers.append(item)
                #print(headers)
                line_count += 1
            else:
                print('{')
                for idx in range(len(row)):
                    if (idx != (len(row) -1)):
                        print(f'"{headers[idx]}":"{row[idx]}"', end=",")
                    else :
                        print(f'"{headers[idx]}":"{row[idx]}"', end="")
                print('},')
                line_count += 1
        #print(f'Processed {line_count} lines.')
        print("]")

def main():
    readCSV("experiment1_trials.csv")

main()

