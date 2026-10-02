# BDCON Labs Asset Directory Architecture

This directory defines the structured asset system for BDCON Labs:

```text
src/assets/
├── brand/
│   ├── logo.svg              # Primary brand mark (clean vector temporary mark)
│   ├── logo-dark.svg         # Dark-mode optimized mark
│   └── favicon.svg           # Site favicon
│
├── placeholders/
│   ├── product-placeholder.svg
│   ├── portfolio-placeholder.svg
│   ├── book-cover-placeholder.svg
│   └── author-placeholder.svg
│
└── README.md
```

## Guidelines:
1. No arbitrary stock images or fake screenshots are to be committed.
2. Production product screenshots and portfolio artifacts will be incorporated in Stage 2+ with actual project deliverables.
3. All image slots use domain-resilient fallback containers with `referrerPolicy="no-referrer"`.
