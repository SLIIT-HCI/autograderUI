import csv
with open('Examples\Answers\marking-scheme.csv', 'r') as file:
    rows = []
    reader = csv.reader(file)
    for row in reader:
        rows.append(row)

    print(rows)


# from zipfile import ZipFile
# archive = ZipFile('Examples\Answers\Answers.zip', 'r')
# imgdata = archive.read('IT112345670.txt')
# files = archive.namelist()

# x = input()

# print(archive.read(files[x]))


# with ZipFile('Examples\Answers\Answers.zip', 'r') as zipObj:
#     # Get list of files names in zip
#     listOfiles = zipObj.namelist()
#     for elem in listOfiles:
#         print(elem)