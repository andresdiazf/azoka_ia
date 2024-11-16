import PyPDF2
import sys
import json

def extract_pdf_data(file_path):
    try:
        with open(file_path, 'rb') as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
            return text
    except Exception as e:
        return f"Error al procesar el archivo: {str(e)}"

if __name__ == "__main__":
    pdf_path = sys.argv[1]  # Recibir ruta del archivo como argumento
    extracted_text = extract_pdf_data(pdf_path)
    print(json.dumps({"text": extracted_text}))  # Imprimir datos en formato JSON
