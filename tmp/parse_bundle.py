import re
import json

with open('/tmp/asrar_bundle.js', 'r', encoding='utf-8') as f:
    text = f.read()

print("Length of bundle:", len(text))

# Let's search for book definitions or array of objects with title
# Find keywords: Rokomari, Wafilife, বই, উপন্যাস, গল্প, etc.
keywords = ['rokomari', 'wafilife', 'রকমারি', 'ওয়াফিলাইফ', 'বই', 'প্রকাশক', 'উপন্যাস', 'সূচিপত্র', 'rakibasrar', 'about', 'biography']
for kw in keywords:
    matches = [m.start() for m in re.finditer(kw, text, re.IGNORECASE)]
    print(f"Keyword '{kw}' found {len(matches)} times")

# Let's dump excerpts around 'rokomari' or 'wafilife'
for m in re.finditer(r'rokomari', text, re.IGNORECASE):
    idx = m.start()
    print("--- ROKOMARI CONTEXT ---")
    print(text[max(0, idx-300):min(len(text), idx+500)])
    print("------------------------")
    break
