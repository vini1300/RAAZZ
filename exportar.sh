# Script para copiar arquivos alterados para uma pasta de exportação
export_folder="exportados" # Pasta onde os arquivos alterados serão copiados
mkdir -p $export_folder

# Lista de arquivos alterados desde o último commit
modified_files=$(git diff --name-only HEAD)

for file in $modified_files; do
    # Copia cada arquivo alterado para a pasta de exportação
    cp --parents "$file" "$export_folder"
done
