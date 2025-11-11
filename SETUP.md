# Design System Builder - Setup Guide

Complete setup instructions for using the Design System Builder plugin.

## Table of Contents
1. [Installation](#installation)
2. [Variable Setup](#variable-setup)
3. [File Preparation](#file-preparation)
4. [Quick Start](#quick-start)
5. [Verify Installation](#verify-installation)
6. [Troubleshooting Setup](#troubleshooting-setup)

---

## Installation

### Install from Figma Community

#### Step 1: Open Figma
- Go to figma.com or open Figma desktop app
- Log in to your account

#### Step 2: Access Plugins
In any Figma file:
- Click **Assets** panel (left sidebar)
- Look for **Plugins** tab (or icon)
- Click the **+** icon next to Plugins

#### Step 3: Search and Install
- Search for "Design System Builder"
- Click the plugin
- Click **Install**
- Wait for installation to complete

#### Step 4: First Run
- Close the search dialog
- In Plugins tab, click **Design System Builder**
- Plugin window opens on right side of screen

---

### Install for Development

If you're developing the plugin locally:

#### Step 1: Clone Repository
```bash
git clone https://github.com/your-repo/figma-design-system-builder.git
cd figma-design-system-builder
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Build TypeScript
```bash
npm run build
```

Creates `code.js` bundle.

#### Step 4: Install in Figma
In Figma:
- Plugins → Development → Create plugin
- Upload `manifest.json`
- Point to local `code.js`
- Test in real Figma files

---

## Variable Setup

### Required: Create Size Variables

Before using the plugin, you must create design system variables.

#### Step 1: Open Variables Panel

In your Figma file:
1. Click **Assets** panel (left sidebar)
2. Click **Variables** tab (key icon)
3. Click **Create variable collection** (if not already created)

#### Step 2: Create Variable Collection

Name it exactly: **Icon size**

This collection will hold all your size variables.

#### Step 3: Add Size Variables

Create these 7 variables in the "Icon size" collection:

| Variable Name | Value | Type |
|---|---|---|
| `Icon size/12` | 12 | Number |
| `Icon size/16` | 16 | Number |
| `Icon size/20` | 20 | Number |
| `Icon size/24` | 24 | Number |
| `Icon size/32` | 32 | Number |
| `Icon size/40` | 40 | Number |
| `Icon size/48` | 48 | Number |

#### Step 4: Verify Variables

- Each variable should have a numeric value matching its size
- Names must be exactly as shown above (case-sensitive)
- All 7 variables must exist

**Visual Checklist**:
```
Icon size (collection)
├── Icon size/12 = 12
├── Icon size/16 = 16
├── Icon size/20 = 20
├── Icon size/24 = 24
├── Icon size/32 = 32
├── Icon size/40 = 40
└── Icon size/48 = 48
```

---

### Optional: Set up Color Styles (Future)

Currently not supported, but planned:
- Create "Grey/Grey-Primary" color style for stroke colors
- Future version will bind to these styles

---

## File Preparation

### Organize Your Design File

#### Structure Recommendation

```
Design System File
├── Page: Icons - Source
│   └── All original icon frames
├── Page: Icons - Components (Icon Set)
│   └── Generated component sets (7 sizes each)
├── Page: Icons - Components (Single)
│   └── Generated single 24px components
└── Page: Setup
    └── Shared variables and settings
```

#### Create Pages

1. In your Figma file, right-click on page tabs
2. Select "Add page"
3. Rename pages as above

#### Source Icons Page

1. Go to "Icons - Source" page
2. Create frames for each icon
3. Name frames descriptively:
   - Good: `heart`, `star-filled`, `arrow-up`
   - Avoid: `icon 1`, `heart:filled`, `arrow/up`

#### Icon Frames

For each icon:

1. **Create a Frame**
   - Insert → Frame
   - Name it (e.g., "heart")

2. **Add Icon Content**
   - Create paths, groups, or components inside the frame
   - Keep icons simple (avoid complex nesting)

3. **Square Dimensions** (recommended)
   - Set width = height (e.g., 48x48)
   - Makes scaling more predictable

4. **Stroke-based Design** (recommended)
   - Use strokes instead of fills for best results
   - Plugin optimizes stroke weights automatically

---

## Quick Start

### Complete Setup Checklist

```
Setup Steps:
□ Install plugin from Figma Community
□ Create "Icon size" variable collection
□ Add 7 size variables (Icon size/12 through Icon size/48)
□ Create "Icons - Source" page
□ Create icon frames with proper names
□ Open Design System Builder plugin
□ Select an icon frame
□ Click Icon Set Builder or Single Icon Builder
□ Enter component name
□ Click "Create Icon Set" or "Create Icon"
□ Check that components are created
□ Verify console shows variable binding (✓ symbols)
```

---

### Your First Component Set

#### 1. Prepare Icon
- Go to "Icons - Source" page
- Select a frame containing an icon (or create a new one)
- Frame name will be the component set name

#### 2. Open Plugin
- Open Design System Builder from Plugins menu

#### 3. Create Component Set
- Click "Icon Set Builder" tile
- Enter component name in the input field
- Click "Create Icon Set"

#### 4. Check Results
- Should see new component set on your page
- Purple dashed frame with 7 component variants
- Positioned to the right of your source frame

#### 5. Verify Variables
- Right-click plugin → Inspect
- Look in Console tab
- Should see 7 "✓ Bound" messages

**Success!** Your first icon component set is ready to use.

---

### Your First Single Icon

#### 1. Prepare Icon
- Select a frame containing an icon
- Can be any icon, any size

#### 2. Open Plugin
- Open Design System Builder

#### 3. Create Component
- Click "Single Icon Builder" tile
- Enter component name
- Click "Create Icon"

#### 4. Check Results
- Component created as 24px frame
- Positioned to the right of source
- Bound to Icon size/24 variable

**Done!** Single icon component ready.

---

## Verify Installation

### Check 1: Plugin Opens

1. Plugins → Design System Builder
2. Should see plugin window with landing screen
3. Should show 2-3 builder tiles

**If not**: See Troubleshooting section below

### Check 2: Variables Exist

1. Assets → Variables
2. Should see "Icon size" collection
3. Should have 7 variables (12 through 48)

**If not**: Follow Variable Setup section above

### Check 3: Create Test Component

1. Create test icon frame (any simple shape)
2. Name it "test-icon"
3. Open plugin
4. Click Icon Set Builder
5. Click Create Icon Set

**Expected**: New component set appears on canvas

**If not**: Check console logs (right-click plugin → Inspect → Console)

### Check 4: Verify Variable Binding

1. After creating component set
2. Right-click plugin → Inspect
3. Go to Console tab
4. Should see messages like:
   ```
   ✓ Bound component to Icon size/12 variable
   ✓ Bound component to Icon size/16 variable
   [etc for all 7 sizes]
   ```

**If you see "Could not find variable"**: Variables don't exist, create them

---

## Troubleshooting Setup

### Plugin Won't Install

**Problem**: Can't find plugin in Figma Community

**Solution**:
1. Make sure you're logged into Figma
2. Try searching in different Figma files
3. Check that your Figma version is up to date
4. Try uninstalling any old version first

---

### Can't Create Variables

**Problem**: Variable collection or variables won't create

**Check**:
1. Are you on a team file? (Some restrictions apply)
2. Do you have edit permissions?
3. Is the file unlocked?

**Solution**:
1. Duplicate file to your workspace
2. Try creating variables in duplicated file
3. Variables should create successfully

---

### Plugin Opens but Shows Error

**Problem**: Error message when opening plugin

**Solution**:
1. Close plugin
2. Refresh Figma (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
3. Reopen plugin

**If still failing**:
1. Uninstall plugin
2. Restart Figma
3. Reinstall plugin from Community

---

### Variables Created but Plugin Can't Find Them

**Problem**: Console shows "Could not find variable for size X"

**Check These**:

1. **Variable Names**
   - Must be exactly: `Icon size/24` (case-sensitive)
   - No extra spaces
   - Uses forward slash (/)

2. **Variable Values**
   - Must be numbers (not text)
   - Value should match size (Icon size/24 = 24)

3. **Variable Collection**
   - Collection name must be exactly: `Icon size`

**Solution**:
1. Delete incorrectly named variables
2. Create them again following exact format
3. Try creating component again

---

### First Component Creates but Won't Bind

**Problem**: Component created but console shows binding error

**Possible Causes**:
1. Variables exist but have different names
2. Figma plugin API issue
3. File permissions issue

**Solution**:
1. Verify variable names in Variables panel
2. Close and reopen plugin
3. Try again
4. If still failing, check file permissions

---

### Components Not Appearing in Right Location

**Problem**: Components created but in unexpected location

**This is Normal**: Components are positioned relative to source frames

**If you want them elsewhere**:
1. Select the component
2. Drag to desired location
3. No need to recreate

---

## Getting Help

### Check Documentation
- User Guide: See USER_GUIDE.md
- Developer Guide: See DEVELOPER_GUIDE.md
- Troubleshooting: See TROUBLESHOOTING.md
- API Reference: See API_REFERENCE.md

### Debug with Console
1. Right-click plugin window
2. Select "Inspect"
3. Go to "Console" tab
4. Look for error messages
5. Check "Variable Binding" section in TROUBLESHOOTING.md

### Common Issues
- **Variables not found**: Check TROUBLESHOOTING.md > Variable Binding Issues
- **Components distorted**: Check TROUBLESHOOTING.md > Component Creation Issues
- **Batch processing fails**: Check TROUBLESHOOTING.md > Batch Processing Issues

---

## Next Steps

After successful setup:

1. **Create Icon Library**
   - Use Icon Set Builder for multi-size icons
   - Use Single Icon Builder for fixed-size components
   - Build complete icon system

2. **Organize Components**
   - Move components to library file
   - Create categories/groups
   - Share with team

3. **Document Usage**
   - Create design system guidelines
   - Document naming conventions
   - Share component usage guide

4. **Set Up for Team**
   - Share variables with team
   - Give library file view access
   - Train team on plugin usage

---

**Setup Complete!** You're ready to start building icon components.

For questions, see the complete documentation:
- USER_GUIDE.md - For using the plugin
- DEVELOPER_GUIDE.md - For extending the plugin
- TROUBLESHOOTING.md - For solving problems

**Last Updated**: November 2024
