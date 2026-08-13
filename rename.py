import os
import re

ROOT_DIR = r"d:\pandac-store-main\pandac-store-main"

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Replace java packages specifically
        content = content.replace("in.pandac.store", "in.botanicalbliss.store")
        
        # Replace general text
        content = content.replace("Pandac Store", "Botanical Bliss")
        content = content.replace("pandac-store-backend", "botanical-bliss-backend")
        content = content.replace("pandac-store-ui", "botanical-bliss-ui")
        content = content.replace("pandac-backend", "botanical-bliss-backend")
        content = content.replace("pandac-frontend", "botanical-bliss-frontend")
        content = content.replace("pandac", "botanical-bliss")
        content = content.replace("Pandac", "Botanical Bliss")

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        pass

# Phase 1: File contents
for root, dirs, files in os.walk(ROOT_DIR):
    if "node_modules" in root or ".git" in root or "build" in root or "dist" in root or ".gradle" in root:
        continue
    for file in files:
        if file.endswith((".java", ".xml", ".yml", ".yaml", ".properties", ".md", ".json", ".jsx", ".js", ".html", ".sh", ".env", "Dockerfile", "gradle")):
            replace_in_file(os.path.join(root, file))

# Phase 2: Directory and file renames (bottom-up to avoid breaking paths)
for root, dirs, files in os.walk(ROOT_DIR, topdown=False):
    if "node_modules" in root or ".git" in root or "build" in root or "dist" in root or ".gradle" in root:
        continue
    
    # Rename files
    for name in files:
        if "pandac" in name.lower():
            new_name = name.replace("pandac", "botanical-bliss")
            os.rename(os.path.join(root, name), os.path.join(root, new_name))
            
    # Rename dirs
    for name in dirs:
        if "pandac" in name.lower():
            # For Java package folder specifically
            if name == "pandac" and "java" in root:
                new_name = "botanicalbliss"
            else:
                new_name = name.replace("pandac", "botanical-bliss")
            
            old_path = os.path.join(root, name)
            new_path = os.path.join(root, new_name)
            try:
                os.rename(old_path, new_path)
                print(f"Renamed {old_path} -> {new_path}")
            except Exception as e:
                print(f"Failed to rename {old_path}: {e}")

print("Rename complete!")
