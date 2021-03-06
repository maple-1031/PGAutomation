import os
from pdf2image import convert_from_path
from pathlib import Path
# os.chdir(os.path.dirname(os.path.abspath(__file__)))

def parce_pdf():
    UPLOAD_FOLDER = Path("./PDF")
    UPLOAD_FILE = list(UPLOAD_FOLDER.glob("*.pdf"))[0]
    if len(list(UPLOAD_FOLDER.glob("*.pdf"))) == 0:
        return False
    pages = convert_from_path(UPLOAD_FILE, 800)

    for i, page in enumerate(pages):
        file_name = f"{i}.png"
        image_path = Path("./static")  / file_name
        page.save(image_path, "png")
    return len(pages)

def create_response(n: int):
    ret = [f"{s}.png" for s in range(n)]
    return ret