import zipfile

zip_path = r"D:\Cat&Dog_dataset.zip"
with zipfile.ZipFile(zip_path, 'r') as z:
    files = z.namelist()

print("Number of files: ", len(files))

for file in files[:20]:  # Print the first 20 files
    print(file)