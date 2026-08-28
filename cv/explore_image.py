import numpy as np
from PIL import Image
import glob
from collections import Counter


# =========================
# Load Image Paths
# =========================

cat_images = glob.glob("dataset/Cat/*.jpg")
dog_images = glob.glob("dataset/Dog/*.jpg")

print(f"Number of cat images: {len(cat_images)}")
print(f"Number of dog images: {len(dog_images)}")


# =========================
# Explore Cat Images
# =========================

for cat in cat_images[:5]:

    img = Image.open(cat)

    print(f"Size: {img.size}")

    img_array = np.array(img)

    print(f"Shape: {img_array.shape}")
    print(f"First pixel: {img_array[0, 0]}")


# =========================
# Cat Image Sizes
# =========================

cat_sizes = []

for cat in cat_images:

    img = Image.open(cat)
    cat_sizes.append(img.size)

cat_size_counts = Counter(cat_sizes)

print("Cat image size counts:")

for size, count in cat_size_counts.items():

    print(f"Size: {size}: {count} images")


# =========================
# Dog Image Sizes
# =========================

dog_sizes = []

for dog in dog_images:

    img = Image.open(dog)
    dog_sizes.append(img.size)

dog_size_counts = Counter(dog_sizes)

print("Dog image size counts:")

for size, count in dog_size_counts.items():

    print(f"Size: {size}: {count} images")