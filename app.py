import eel
from Tkinter import *
from tkinter import filedialog 
csvPath=""

eel.init('web')

# Python script for manual.html
def readfile(fileLocation):
    f = open(fileLocation,"r")
    return f.read()


@eel.expose
def fileLocation():
    root = Tk()
    root.title("Autograder")
    root.geometry("1x1")
    
    filename = filedialog.askopenfilename(initialdir = "/", 
                                          title = "Select a File", 
                                          filetypes = [("all files", 
                                                        "*.*")] ) 
    root.withdraw()
    
    fileText = readfile(filename)

    return fileText


def filePath():
    root = Tk()
    root.title("Autograder")
    root.geometry("1x1")
    
    filename = filedialog.askopenfilename(initialdir = "/", 
                                          title = "Select a File", 
                                          filetypes = [("all files", 
                                                        "*.*")] ) 
    root.withdraw()
    return filename


@eel.expose
def readMarkingScheme():
    global csvPath
    import csv
    csvPath = filePath()
    rows = []
    with open(csvPath, 'r') as file:
        
        reader = csv.reader(file)
        for row in reader:
            rows.append(row)

    return(rows[0])

@eel.expose
def writeMarkingScheme(data):
    global csvPath
    import csv
    with open(csvPath, 'a') as file:
        writeMe = csv.writer(file)
        writeMe.writerow(data)
    print(data)


@eel.expose
def openAnswers():
    path = filePath()
    from zipfile import ZipFile
    archive = ZipFile(path, 'r')
    fileNames = archive.namelist()
    return path, fileNames


#Next function is to read a file inside an zipfile

@eel.expose
def readFromZip(path,name):
    from zipfile import ZipFile
    archive = ZipFile(path, 'r')
    text = archive.read(name)

    return text


@eel.expose
def readAllcsv(path,line):
    import csv
    rows = []
    with open(path, 'r') as file:
        
        reader = csv.reader(file)
        for row in reader:
            rows.append(row)

    return rows[line],rows



eel.start('index.html', size=(1000,600))