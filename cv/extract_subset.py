import zipfile
import os
import random

zip_path = r"D:\Cat&Dog_dataset.zip"
output_dir = r"dataset"

NUM_IMAGES = 500

os.makedirs(os.path.join(output_dir, "Cat"), exist_ok=True)
os.makedirs(os.path.join(output_dir, "Dog"), exist_ok=True)

with zipfile.ZipFile(zip_path, 'r') as z:
    for animal in ["Cat", "Dog"]:
        files = [
            f for f in z.namelist()
            if f.startswith(f"PetImages/{animal}/") and f.lower().endswith(('.jpg', '.jpeg', '.png'))
        ]
        selected = random.sample(files, NUM_IMAGES)

        print(f"Extracting {NUM_IMAGES} images of {animal}...")

        for file in selected:
            file_name = os.path.basename(file)

            destination = os.path.join(output_dir, animal, file_name)

            with z.open(file) as source, open(destination, 'wb') as target:
                target.write(source.read())

print("Done!")
