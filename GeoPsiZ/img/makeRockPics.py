from PIL import Image, ImageDraw, ImageFont
import os

# Create a directory to store the images
output_directory = "generated_images"
os.makedirs(output_directory, exist_ok=True)

# Names of the images
image_names = [
    "Basalt", "Diorite", "Granite", "Gabbro", "Obsidian",
    "Peridotite", "Pumice", "Igneous", "Rock Salt", "Breccia",
    "Conglomerate", "Chert", "Shale", "Sandstone", "Rock Gypsum", "Sedimentary"
]

# Image dimensions
width, height = 400, 400

# Font settings
font_size = 60
font_color = "black"
font_path = "Arial"  # You can change this to a different font if needed

# Create images
for name in image_names:
    # Create a new image with a white background
    image = Image.new("RGB", (width, height), "white")
    
    # Load the font
    font = ImageFont.truetype(font_path, font_size)
    

    # Get a drawing context
    draw = ImageDraw.Draw(image)
    
    # Calculate text size and position to center it in the image
    text_size = draw.textsize(name, font)
    text_position = ((width - text_size[0]) // 2, (height - text_size[1]) // 2)
    
    # Add text to the image
    draw.text(text_position, name, font=font, fill=font_color)
    
    # Save the image with the given name
    image_path = os.path.join(output_directory, f"{name}.png")
    image.save(image_path)

print("Images generated successfully.")
