import numpy as np
from PIL import Image
import glob


# =========================
# 1. Load Image Paths
# =========================

cat_images = glob.glob("dataset/Cat/*.jpg")
dog_images = glob.glob("dataset/Dog/*.jpg")


# =========================
# 2. Resize Images
# =========================

IMAGE_SIZE = (224, 224)

resized_cat_images = []

for cat in cat_images:

    img = Image.open(cat)
    img = img.convert("RGB")
    img = img.resize(IMAGE_SIZE)

    resized_cat_images.append(img)


resized_dog_images = []

for dog in dog_images:

    img = Image.open(dog)
    img = img.convert("RGB")
    img = img.resize(IMAGE_SIZE)

    resized_dog_images.append(img)


# =========================
# 3. Convert to NumPy
# =========================

cat_array = np.array(resized_cat_images)
dog_array = np.array(resized_dog_images)


# =========================
# 4. Normalization
# =========================

cat_array = cat_array / 255.0
dog_array = dog_array / 255.0


# =========================
# 5. Create Labels
# =========================

cat_labels = np.zeros(len(cat_array))
dog_labels = np.ones(len(dog_array))


# =========================
# 6. Combine Data
# =========================

x = np.concatenate((cat_array, dog_array), axis=0)

y = np.concatenate((cat_labels, dog_labels), axis=0)


# =========================
# 7. Shuffle Data
# =========================

indices = np.random.permutation(len(x))

x = x[indices]
y = y[indices]