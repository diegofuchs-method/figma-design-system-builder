# Design System Builder Figma Plugin

A comprehensive Figma plugin that automates the creation of icon components with design system integration. Create professional icon component sets with 7 size variants or individual 24px components, with automatic variable binding for design system consistency.

## Quick Links

### For Users (Product Designers)
- **[Setup & Installation](SETUP.md)** - Get started in 5 minutes
- **[User Guide](USER_GUIDE.md)** - Learn how to use the plugin
- **[Troubleshooting](TROUBLESHOOTING.md)** - Solve common issues
- **[FAQ](USER_GUIDE.md#faq)** - Common questions

### For Developers
- **[Developer Guide](DEVELOPER_GUIDE.md)** - Architecture and extending
- **[API Reference](API_REFERENCE.md)** - Complete API documentation
- **[Troubleshooting](TROUBLESHOOTING.md)** - Debugging guide

---

## Features

✅ **Icon Set Builder** - Create icon component sets with 7 size variants (12, 16, 20, 24, 32, 40, 48px) with optimized stroke weights

✅ **Single Icon Builder** - Create individual 24px icon components

✅ **Batch Mode** - Process multiple frames at once for faster workflows

✅ **Variable Binding** - Automatic binding to design system size variables

✅ **Design System Ready** - Components ready to use in library files

✅ **Team Collaboration** - Share components and variables with team

---

## Installation

### From Figma Community (Easiest)
1. Open any Figma file
2. Go to **Assets** → **Plugins** → **+**
3. Search for "Design System Builder"
4. Click **Install**

### For Development
```bash
git clone https://github.com/diegofuchs-method/figma-design-system-builder.git
cd figma-design-system-builder
npm install
npm run build
```

**See [SETUP.md](SETUP.md) for detailed setup instructions.**

---

## Quick Start

### 1. Create Size Variables
In your Figma file, create these variables:
```
Icon size (variable collection)
├── Icon size/12 = 12
├── Icon size/16 = 16
├── Icon size/20 = 20
├── Icon size/24 = 24
├── Icon size/32 = 32
├── Icon size/40 = 40
└── Icon size/48 = 48
```
See [SETUP.md > Variable Setup](SETUP.md#variable-setup) for step-by-step.

### 2. Create Icon Component Set
1. Create a frame with your icon design
2. Open Design System Builder plugin
3. Click "Icon Set Builder"
4. Enter component name
5. Click "Create Icon Set"

Done! You have a component set with 7 sizes.

### 3. Create Single Icon Component
1. Create a frame with your icon
2. Open plugin → "Single Icon Builder"
3. Enter component name
4. Click "Create Icon"

---

## Documentation

### User Documentation
| Document | Purpose |
|---|---|
| [SETUP.md](SETUP.md) | Installation and first-time setup |
| [USER_GUIDE.md](USER_GUIDE.md) | Complete guide for product designers |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Solving common issues |

### Developer Documentation
| Document | Purpose |
|---|---|
| [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) | Architecture, design decisions, extending |
| [API_REFERENCE.md](API_REFERENCE.md) | Complete function and type documentation |
| [DOCUMENTATION_PLAN.md](DOCUMENTATION_PLAN.md) | Documentation outline and structure |

---

## File Structure

```
/project-root
├── README.md                    # This file (start here)
├── SETUP.md                     # Installation guide
├── USER_GUIDE.md                # User documentation
├── DEVELOPER_GUIDE.md           # Developer documentation
├── API_REFERENCE.md             # API documentation
├── TROUBLESHOOTING.md           # Troubleshooting guide
├── DOCUMENTATION_PLAN.md        # Documentation structure
│
├── code.ts                      # Main plugin handler
├── ui.html                      # Plugin UI
├── iconSet.ts                   # Icon Set builder
├── iconSingle.ts                # Single Icon builder
├── iconUtils.ts                 # Shared utilities
├── shared.ts                    # Validation & helpers
│
├── code.js                      # Compiled output
├── manifest.json                # Plugin metadata
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
└── Streamline Regular/          # Icon library (9,416 icons)
```

---

## Key Concepts

### Size Variants
Icon Set builder creates components at 7 sizes with optimized stroke weights:

| Size | Weight | Usage |
|------|--------|-------|
| 12px | 1.0 | Tiny icons, small UI |
| 16px | 1.25 | Small UI elements |
| 20px | 1.5 | Default UI icons |
| 24px | 2.0 | Standard icons |
| 32px | 2.5 | Large icons |
| 40px | 3.0 | Extra large |
| 48px | 3.5 | Huge icons |

### Variable Binding
Components automatically bind to design system variables. Change `Icon size/24` once, and all 24px components update everywhere.

### Batch Processing
Process multiple icons at once:
- Icon Set Builder batch mode: 10 icons → 70 components (7 sizes each)
- Single Icon Builder batch mode: 10 icons → 10 single components

---

## Workflow

### Creating Icons
1. **Prepare** icon frames in design file
2. **Build** using Icon Set or Single Icon builder
3. **Library** move components to design system library
4. **Share** distribute to team

### Managing Sizes
1. **Create** Icon size variables (12-48)
2. **Bind** plugin automatically binds components
3. **Update** change variable value = all components update
4. **Scale** easy resizing for entire design system

---

## Development

### Watch Mode
```bash
npm run dev
```
Automatically rebuilds when you change files.

### Building for Release
```bash
npm run build
```
Creates optimized `code.js` bundle.

### Testing
1. Build the plugin
2. Create development plugin in Figma
3. Test in real Figma files
4. Use console logs for debugging (right-click plugin → Inspect)

### Git Workflow
```bash
# Feature branch
git checkout -b feature/your-feature-name

# Make changes
git add .
git commit -m "Description"
git push origin feature/your-feature-name

# Create pull request when ready
```

See [DEVELOPER_GUIDE.md > Git Workflow](DEVELOPER_GUIDE.md#git-workflow) for details.

---

## Requirements

### For Users
- Figma desktop app or web version
- Design System file with size variables

### For Developers
- Node.js 14+
- TypeScript
- Git

---

## Support

### For Users
1. Check [USER_GUIDE.md](USER_GUIDE.md)
2. See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
3. Check [SETUP.md](SETUP.md) for setup issues

### For Developers
1. Check [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)
2. See [API_REFERENCE.md](API_REFERENCE.md)
3. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for debugging

### Reporting Issues
1. Check relevant documentation above
2. Look at plugin console logs (right-click → Inspect → Console)
3. Include steps to reproduce and minimal example file
4. Create issue on GitHub with collected information

---

## Contributing

Want to contribute? See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) for:
- Code style guidelines
- Testing checklist
- Pull request process

---

## Version

**Current Version**: 1.0
**Last Updated**: November 2024

---

## License

Proprietary software for Method Design System.

---

## Resources

- [Figma Plugin Documentation](https://www.figma.com/plugin-docs/)
- [Figma Variables Guide](https://www.figma.com/plugin-docs/variables/)
- [Component Sets](https://www.figma.com/plugin-docs/component-sets/)
- [Streamline Icon Library](https://www.streamlinehq.com/)

---

## Next Steps

**Ready to get started?**
- Users → Go to [SETUP.md](SETUP.md)
- Developers → Go to [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)

**Have questions?**
- Check the documentation above
- See [Troubleshooting](TROUBLESHOOTING.md)
- Create an issue on GitHub
