#!/bin/bash
# Bilder-Optimierungs-Script für Draftnex Solutions

echo "🖼️  Bilder-Optimierung wird gestartet..."

# Prüfe ob Tools installiert sind
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick ist nicht installiert."
    echo "   Installation: sudo apt-get install imagemagick"
    echo ""
fi

if ! command -v cwebp &> /dev/null; then
    echo "❌ WebP-Tools sind nicht installiert."
    echo "   Installation: sudo apt-get install webp"
    echo ""
fi

# Wenn Tools fehlen, Anleitung anzeigen
if ! command -v convert &> /dev/null || ! command -v cwebp &> /dev/null; then
    echo "📝 Manuelle Optimierung empfohlen:"
    echo "   1. Nutze https://squoosh.app/ (Online, kostenlos)"
    echo "   2. Oder https://tinypng.com/ (PNG/JPG)"
    echo ""
    echo "🎯 Ziel-Größen:"
    echo "   - buiswebsite.png: Aktuell 1.3MB → Ziel <300KB"
    echo "   - draftnex-logo.png: Aktuell 117KB → Ziel <50KB"
    echo ""
    echo "💡 Empfohlene Einstellungen:"
    echo "   - Format: WebP oder optimiertes PNG"
    echo "   - Qualität: 80-85%"
    echo "   - Größe: Max-Breite 1920px"
    exit 1
fi

echo "✅ Alle Tools verfügbar!"
echo ""

# Backup erstellen
mkdir -p backup-images
cp *.png backup-images/ 2>/dev/null

# draftnex-logo.png optimieren
if [ -f "draftnex-logo.png" ]; then
    echo "🔧 Optimiere draftnex-logo.png..."
    convert draftnex-logo.png -strip -quality 85 -resize '200x200>' draftnex-logo-optimized.png
    cwebp -q 85 draftnex-logo.png -o draftnex-logo.webp
    echo "   ✓ PNG optimiert: draftnex-logo-optimized.png"
    echo "   ✓ WebP erstellt: draftnex-logo.webp"
fi

# buiswebsite.png optimieren
if [ -f "buiswebsite.png" ]; then
    echo "🔧 Optimiere buiswebsite.png..."
    convert buiswebsite.png -strip -quality 80 -resize '1920x1920>' buiswebsite-optimized.png
    cwebp -q 80 buiswebsite.png -o buiswebsite.webp
    echo "   ✓ PNG optimiert: buiswebsite-optimized.png"
    echo "   ✓ WebP erstellt: buiswebsite.webp"
fi

echo ""
echo "✨ Optimierung abgeschlossen!"
echo "📊 Größenvergleich:"
ls -lh *.png *.webp 2>/dev/null | awk '{print "   ", $9, "-", $5}'
