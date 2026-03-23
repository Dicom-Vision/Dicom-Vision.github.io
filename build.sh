#!/usr/bin/env bash
set -euo pipefail

# Build both language versions of the site
# Usage: ./build.sh [output_dir]
#   output_dir defaults to ./_output

OUTPUT="${1:-_output}"
rm -rf "$OUTPUT"

echo "==> Building English site (dicom.vision)..."
JEKYLL_ENV=production bundle exec jekyll build \
  --config _config.yml \
  -d "$OUTPUT/en"

echo "==> Building Italian site (dicomvision.it)..."
JEKYLL_ENV=production bundle exec jekyll build \
  --config _config.yml,_config_it.yml \
  -d "$OUTPUT/it"

echo "==> Done. Output:"
echo "    EN: $OUTPUT/en/"
echo "    IT: $OUTPUT/it/"
echo ""
echo "Deploy with:"
echo "  rsync -avz --delete $OUTPUT/en/ user@server:/var/www/dicomvision/en/"
echo "  rsync -avz --delete $OUTPUT/it/ user@server:/var/www/dicomvision/it/"
