#!/bin/bash

# Resize images using ImageMagick
for img in *.png; do
    echo "Resizing $img..."
    convert "$img" -resize 800x "$img"
done
