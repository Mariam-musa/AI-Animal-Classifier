from preprocess import x, y
from sklearn.model_selection import train_test_split
import tensorflow as tf
import os


x_train, x_test, y_train, y_test = train_test_split(
    x,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

base_model = tf.keras.applications.MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights='imagenet'
)

base_model.trainable = False

model = tf.keras.Sequential([
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.Dense(128, activation="relu"),
    tf.keras.layers.Dropout(0.5),
    tf.keras.layers.Dense(2, activation="softmax")
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']  
)

history = model.fit(
    x_train,
    y_train,
    epochs=10,
    validation_split=0.2
)

test_loss, test_accuracy = model.evaluate(
    x_test,
    y_test
)

print("Test Accuracy:", test_accuracy)

os.makedirs("model", exist_ok=True)

model.save(r"G:\My Drive\AI_Animal_Classifier\model\animal_classifier.keras")

print("Model saved successfully!")
