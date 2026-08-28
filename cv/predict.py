# import tensorflow as tf
# from PIL import Image
# import numpy as np


# model = tf.keras.models.load_model(r"G:\My Drive\AI_Animal_Classifier\model\animal_classifier.keras")

# image_path = "dataset/Cat/2260.jpg"  

# image = Image.open(image_path)
# image = image.convert("RGB")  # Ensure the image is in RGB format
# image = image.resize((224, 224))  # Resize the image to the required size
# image_array = np.array(image)  # Convert the image to a NumPy array
# image_array = image_array / 255.0  # Normalize the image
# image_array = np.expand_dims(image_array, axis=0)  # Add a batch dimension

# # Make a prediction
# predictions = model.predict(image_array)

# # Get the predicted class
# predicted_class = np.argmax(predictions[0])

# if predicted_class == 0:
#     label = "Cat 🐱"
# else:
#     label = "Dog 🐶"

# confidence = predictions[0][predicted_class] * 100
# print(f"Predicted class: {label} with confidence: {confidence:.2f}%")




#------------------------------------------------




# import tensorflow as tf
# from PIL import Image
# import numpy as np
# from tkinter import filedialog, Tk




# image_path = "dataset/Cat/2260.jpg"  

# root = Tk()
# root.withdraw()  # Hide the main window
# image_path = filedialog.askopenfilename(
#     title="Select an image", 
#     filetypes=[("Image files", "*.jpg *.jpeg *.png")])

# image = Image.open(image_path)
# image = image.convert("RGB")  
# image = image.resize((224, 224))  
# image_array = np.array(image)  
# image_array = image_array / 255.0  
# image_array = np.expand_dims(image_array, axis=0) 

# predictions = model.predict(image_array)

# Get the predicted class
# predicted_class = np.argmax(predictions[0])

# if predicted_class == 0:
#     label = "Cat 🐱"
# else:
#     label = "Dog 🐶"

# confidence = predictions[0][predicted_class] * 100
# print(f"Predicted class: {label} with confidence: {confidence:.2f}%")


#------------------------------------------------






# import tensorflow as tf
# from PIL import Image
# import numpy as np
# from tkinter import filedialog, Tk
# import os
# from google import genai


# client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


# model = tf.keras.models.load_model(r"G:\My Drive\AI_Animal_Classifier\model\animal_classifier.keras")

# root = Tk()
# root.withdraw()  # Hide the main window
# image_path = filedialog.askopenfilename(
#     title="Select an image", 
#     filetypes=[("Image files", "*.jpg *.jpeg *.png")])

# if not image_path:
#     print("No image selected.")
#     exit()


# image = Image.open(image_path)
# image = image.convert("RGB")  
# image = image.resize((224, 224))  
# image_array = np.array(image)  
# image_array = image_array / 255.0  
# image_array = np.expand_dims(image_array, axis=0) 

# predictions = model.predict(image_array)
# predicted_class = np.argmax(predictions[0])

# if predicted_class == 0:
#     label = "Cat 🐱 "
# else:
#     label = "Dog 🐶 "

# confidence = predictions[0][predicted_class] * 100
# print(f"Predicted class: {label}with confidence: {confidence:.2f}%")


# response = client.models.generate_content(
#     model="gemini-3.5-flash-lite",
#     contents=f"Please provide a brief description of the animal in the image. The image is classified as: {label} with a confidence of {confidence:.2f}%."
# )

# print("\nAnimal Information:")
# print(response.text)








import tensorflow as tf
from PIL import Image
import numpy as np
from tkinter import filedialog, Tk
import os
from google import genai


client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


model = tf.keras.models.load_model(r"G:\My Drive\AI_Animal_Classifier\model\animal_classifier.keras")

root = Tk()

root.withdraw()  # Hide the main window

image_path = filedialog.askopenfilename(
    title="Select an image", 
    filetypes=[("Image files", "*.jpg *.jpeg *.png")]
    )

if not image_path:
    print("No image selected.")
    exit()


image = Image.open(image_path)

image = image.convert("RGB")  

image = image.resize((224, 224))  

image_array = np.array(image)  

image_array = image_array / 255.0  

image_array = np.expand_dims(image_array, axis=0) 


predictions = model.predict(image_array)

predicted_class = np.argmax(predictions[0])

if predicted_class == 0:
    label = "Cat 🐱 "
else:
    label = "Dog 🐶 "

confidence = predictions[0][predicted_class] * 100

print(f"Predicted class: {label}with confidence: {confidence:.2f}%")


response = client.models.generate_content(
    model="gemini-3.5-flash-lite",
    contents=f"Please provide a brief description of the animal in the image. The image is classified as: {label} with a confidence of {confidence:.2f}%."
)

print("\nAnimal Information:")

print(response.text)
