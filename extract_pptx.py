import sys
from pptx import Presentation

def extract_text(ppt_path):
    try:
        prs = Presentation(ppt_path)
        text = []
        for slide in prs.slides:
            for shape in slide.shapes:
                if hasattr(shape, "text") and shape.text.strip():
                    text.append(shape.text.strip())
        return "\n".join(text)
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    ppt_file = sys.argv[1]
    print(extract_text(ppt_file))
