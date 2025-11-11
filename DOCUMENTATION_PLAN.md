# Design System Builder Plugin - Documentation Plan

## Overview
Comprehensive documentation for the Design System Builder Figma plugin, covering both user guides for product designers and developer guides for extending the plugin.

---

## Section 1: User Guide (for Product Designers)

### 1.1 Getting Started
- What is the Design System Builder?
- Installation & setup
- Opening the plugin in Figma
- Plugin UI overview

### 1.2 Icon Set Builder
- **Purpose:** Create icon components with 7 size variants (12, 16, 20, 24, 32, 40, 48px)
- **Stroke Weight Reference:** Explains optimized stroke weights for each size
- **Single Mode:**
  - How to select a frame
  - Naming conventions
  - Creating a component set
  - Understanding the output
- **Batch Mode:**
  - Selecting multiple frames
  - Using frame names as icon names
  - Creating multiple component sets at once
  - Best practices

### 1.3 Single Icon Builder
- **Purpose:** Create individual 24px icon components
- **Single Mode:**
  - Selecting a frame
  - Naming your component
  - Creating the component
- **Batch Mode:**
  - Selecting multiple frames
  - Using frame names as component names
  - Vertically stacked output
  - Best practices

### 1.4 Design System Features
- **Size Variables:** How components bind to Icon size variables
- **Variable Benefits:** What happens when you update a size variable
- **Variable Locations:** Where to find and edit size variables

### 1.5 Best Practices
- Naming conventions for icons
- File organization
- When to use Icon Set vs Single Icon
- Troubleshooting common issues

### 1.6 FAQ
- Common questions and answers
- Limitations
- Performance tips

---

## Section 2: Developer Guide (for Extending the Plugin)

### 2.1 Project Overview
- Purpose and goals
- Current features
- Technology stack (TypeScript, Figma Plugin API, Vercel)
- Repository structure

### 2.2 Architecture & Design Decisions
- Why TypeScript for plugin development
- Component structure philosophy
- Variable binding approach
- File organization rationale
- Git branching strategy (main vs feature branches)

### 2.3 Codebase Structure
```
/project-root
├── code.ts              - Main plugin handler & message routing
├── code.js              - Compiled output
├── ui.html              - Plugin UI (all screens)
├── iconSet.ts           - Icon Set builder implementation
├── iconSingle.ts        - Single Icon builder implementation
├── iconUtils.ts         - Shared utilities (component creation, styling)
├── shared.ts            - Shared validation & helper functions
├── api/feedback.ts      - Vercel function for feedback (feature branch)
├── manifest.json        - Plugin metadata
├── package.json         - Dependencies & build scripts
├── tsconfig.json        - TypeScript configuration
├── Streamline Regular/  - Complete Streamline icon library (9,416 icons)
└── vercel.json          - Vercel deployment configuration
```

### 2.4 Key Files & Their Responsibilities

#### code.ts (~200 lines)
- Routes messages between UI and builder functions
- Handles Figma API calls
- Manages icon creation workflows
- Message types: `create-icon-set`, `create-icon-single`, `send-feedback`

#### ui.html (~1000+ lines)
- Complete plugin UI markup and styles
- Landing screen with builder tiles
- Icon Set builder view (single/batch modes)
- Single Icon builder view (single/batch modes)
- Feedback form (feature branch)
- Custom dropdown component
- JavaScript for UI interactions

#### iconSet.ts (~200 lines)
- `createIconSet()` - Single mode icon set creation
- `processBatch()` - Batch mode icon set creation
- SIZES_AND_WEIGHTS mapping (12-48px with optimized stroke weights)
- Component set naming and layout

#### iconSingle.ts (~150 lines)
- `createIconSingle()` - Single mode 24px component creation
- `processBatchSingle()` - Batch mode multiple 24px components
- Vertical stacking for batch output

#### iconUtils.ts (~250 lines)
- `createIconComponent()` - Core component frame creation
- `applyStrokeWeightRecursive()` - Applies stroke weights to vectors
- `getVariable()` - Finds size variables for binding
- `centerComponentsInFrame()` - Centers components in component set
- `styleComponentSet()` - Applies visual styling to component sets
- `setComponentConstraints()` - Sets up component constraints
- SPACING constant for layout

#### shared.ts (~80 lines)
- `validateAndExtractWorkingFrame()` - Extracts and validates icon frames
- `isValidName()` - Validates component names
- Shared type definitions and interfaces

### 2.5 How to Add a New Feature

#### Example: Add a New "Batch Badge Builder"

1. **Create a new file:** `badgeBuilder.ts`
   ```typescript
   export async function createBadge(sourceNode: BaseNode, badgeName: string): Promise<void> {
     // Implementation
   }

   export async function processBatchBadge(selectedNodes: readonly BaseNode[]): Promise<BuilderResult> {
     // Implementation
   }
   ```

2. **Update code.ts** to handle the new message type:
   ```typescript
   if (msg.type === 'create-badge') {
     await createBadge(selectedNode, badgeName);
   }
   ```

3. **Update ui.html** to add:
   - New builder tile on landing screen
   - New builder view section
   - JavaScript handlers for your builder

4. **Create a feature branch:**
   ```bash
   git checkout -b feature/badge-builder
   ```

5. **Test thoroughly** in Figma before merging to main

6. **Create a pull request** with documentation of the new feature

### 2.6 Variable Binding Implementation

#### Size Variables
- **Location:** `iconUtils.ts` - `getVariable()` function
- **Pattern:** Variables named as `Icon size/12`, `Icon size/16`, etc.
- **Binding:** Uses `component.setBoundVariable('width', variable)` and `component.setBoundVariable('height', variable)`
- **How to modify:** Change the variable path in `getVariable()` function

#### Adding New Variables
1. Create variables in your Figma file
2. Update the `getVariable()` function to match your variable naming
3. Components will automatically bind to them

### 2.7 Deployment

#### Local Development
```bash
npm install
npm run build
# Test in Figma with localhost
```

#### Building for Release
```bash
npm run build
# Creates code.js bundle
git add code.js
git commit -m "Build for release"
git push origin main
```

#### Vercel Deployment (Feedback Feature - Feature Branch)
- API endpoint: `/api/feedback`
- Requires environment variables: `SENDGRID_API_KEY`, `RECIPIENT_EMAIL`
- See FEEDBACK_SETUP.md for detailed setup

### 2.8 Git Workflow

#### Main Branch
- Stable, production-ready code
- Core features: Icon Set Builder, Single Icon Builder
- Size variable binding

#### Feature Branches
- `feature/feedback-improvements` - Feedback form with email integration
- `feature/new-feature-name` - Any new features in development

#### Creating a Feature Branch
```bash
git checkout -b feature/your-feature-name
# Make changes
git commit -m "Description of changes"
git push origin feature/your-feature-name
# Create pull request when ready
```

### 2.9 Common Tasks

#### Modify Size Variants
Edit `SIZES_AND_WEIGHTS` in `iconSet.ts`:
```typescript
const SIZES_AND_WEIGHTS: { [key: number]: number } = {
  12: 1,
  16: 1.25,
  // ... add or modify sizes and weights
};
```

#### Change Stroke Weight Formula
Update `applyStrokeWeightRecursive()` in `iconUtils.ts`

#### Update Component Styling
Modify `styleComponentSet()` in `iconUtils.ts` to change:
- Stroke color
- Stroke style (dashed, solid)
- Padding
- Alignment

#### Add UI Elements
Edit `ui.html` to add:
- New buttons/inputs
- New views/screens
- New styling rules
- New JavaScript handlers

### 2.10 Testing Checklist

Before merging to main:
- [ ] Single mode creates components correctly
- [ ] Batch mode processes all selected frames
- [ ] Size variables bind properly
- [ ] Component naming is correct
- [ ] Components are properly centered
- [ ] No console errors
- [ ] UI is responsive
- [ ] Back button navigation works
- [ ] Error messages display correctly

### 2.11 Code Style & Conventions

- **Naming:** camelCase for functions/variables, PascalCase for types
- **Comments:** Explain the "why" not the "what"
- **Error Handling:** Always try/catch async operations
- **Logging:** Use console.log for debugging, remove before merging
- **Documentation:** Add JSDoc comments to exported functions

### 2.12 Resources

- [Figma Plugin API Documentation](https://www.figma.com/plugin-docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vercel Functions Documentation](https://vercel.com/docs/functions)
- [Streamline Icon Library](https://www.streamlinehq.com/)

### 2.13 Future Enhancement Ideas

- [ ] Color style binding (when library access is available)
- [ ] Custom stroke weight presets
- [ ] Icon animation support
- [ ] Batch export to SVG
- [ ] Icon search/filter interface
- [ ] Template-based icon creation
- [ ] Analytics dashboard for icon usage

---

## Section 3: Feature Branch Documentation

### Feedback Feature (feature/feedback-improvements)
Located on the `feature/feedback-improvements` branch

- User feedback form with file uploads
- Email integration via SendGrid
- Vercel backend function
- User name, feature selection, feedback text, file attachments

See FEEDBACK_SETUP.md for deployment details

---

## Documentation Sections to Create in Confluence

1. **Overview Page** - Link to all sections
2. **User Guide** - Section 1 content
3. **Developer Guide** - Section 2 content
4. **API Reference** - Function signatures and parameters
5. **Troubleshooting** - Common issues and solutions
6. **Roadmap** - Future features and enhancements
7. **Architecture Diagrams** - Visual representation of data flow

---

## Notes

- Documentation should include code examples where helpful
- Consider adding screenshots/GIFs of the plugin in action
- Keep user guide and developer guide separate for clarity
- Update documentation when adding new features
- Maintain version consistency between docs and actual code
