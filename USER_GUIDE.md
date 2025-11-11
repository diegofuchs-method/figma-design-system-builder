# Design System Builder Plugin - User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Icon Set Builder](#icon-set-builder)
3. [Single Icon Builder](#single-icon-builder)
4. [Design System Features](#design-system-features)
5. [Best Practices](#best-practices)
6. [FAQ](#faq)

---

## Getting Started

### What is the Design System Builder?

The Design System Builder is a Figma plugin designed to help product designers create, organize, and manage icon components with design system integration. It provides two main tools:

- **Icon Set Builder**: Creates icon components with 7 size variants (12, 16, 20, 24, 32, 40, 48px) combined as variants in a component set
- **Single Icon Builder**: Creates individual 24px icon components

The plugin integrates with your design system variables, automatically binding component sizes to your existing size variables for consistency across your design system.

### Installation & Setup

1. **Install the Plugin**
   - Open Figma on your desktop
   - Go to Assets → Plugins
   - Search for "Design System Builder"
   - Click Install

2. **Open the Plugin**
   - In any Figma file, go to Plugins → Design System Builder
   - The plugin window will open on the right side of your screen

3. **Plugin UI Overview**
   - **Landing Screen**: Shows available builder tools as tiles
   - **Builder Views**: Each tool has its own dedicated view with instructions
   - **Back Button**: Returns to the landing screen from any builder view

### First Time Setup

Before using the Icon Set or Single Icon builders, ensure your Figma file has the required size variables:

**Required Variables**: Create a variable collection called "Icon size" with the following variables:
- `Icon size/12`
- `Icon size/16`
- `Icon size/20`
- `Icon size/24`
- `Icon size/32`
- `Icon size/40`
- `Icon size/48`

**How to Create Variables in Figma**:
1. Go to Assets panel → Variables tab
2. Click "Create variable collection"
3. Name it "Icon size"
4. Create each size variable with a numeric value matching its size (e.g., `Icon size/24` = 24)
5. The plugin will automatically bind component dimensions to these variables

---

## Icon Set Builder

### Purpose

The Icon Set Builder creates a professional component set with your icon at 7 different sizes, with optimized stroke weights for each size. This is ideal when you want a single icon to work across multiple contexts in your design system.

### Stroke Weight Reference

Each size has an optimized stroke weight to maintain visual consistency:

| Size (px) | Stroke Weight |
|-----------|---------------|
| 12        | 1.0           |
| 16        | 1.25          |
| 20        | 1.5           |
| 24        | 2.0           |
| 32        | 2.5           |
| 40        | 3.0           |
| 48        | 3.5           |

These weights are scientifically optimized to maintain the visual weight and clarity of icons across different sizes.

### Single Mode: Creating One Icon Set

**Step 1: Prepare Your Icon**
- Create a frame containing your icon artwork
- Place vectors, groups, or other shapes inside the frame
- Name your frame something descriptive (e.g., "heart", "star", "add")

**Step 2: Select the Frame**
- In Figma, select the frame containing your icon
- Open the Design System Builder plugin
- Click the "Icon Set Builder" tile

**Step 3: Enter Icon Name**
- In the "Single Mode" section, you'll see a text input labeled "Icon name"
- Enter the name for your icon (e.g., "favorite", "rating", "plus")
- This name will be used for the component set

**Step 4: Create the Component Set**
- Click "Create Icon Set"
- The plugin will:
  - Scale your icon to each required size
  - Apply optimized stroke weights
  - Create a component at each size
  - Combine them into a component set
  - Bind component dimensions to size variables
  - Position the component set next to your original frame

**Step 5: Review the Output**
- You'll see a purple dashed frame containing 7 component variants
- Each component is labeled with its size (e.g., "Size=24")
- Components are bound to your `Icon size/*` variables
- The component set is ready to use in your design system library

### Batch Mode: Creating Multiple Icon Sets

**Step 1: Prepare Multiple Icons**
- Create separate frames for each icon you want to convert
- Place each icon in its own frame
- The frame names will become your icon names (e.g., "heart", "star", "add")

**Step 2: Select All Frames**
- In Figma, select all frames containing icons
- You can select them individually (Shift+Click) or drag to select multiple
- Open the Design System Builder plugin
- Click the "Icon Set Builder" tile

**Step 3: Create Component Sets (Batch)**
- Click "Batch Mode" toggle or scroll to the Batch Mode section
- Click "Create Icon Sets"
- The plugin will process all selected frames:
  - Validates all frame names before processing
  - If any frame has invalid characters, it will show an error and stop
  - Otherwise, it creates component sets for all frames
  - Component sets are stacked vertically with 80px spacing

**Step 4: Review Results**
- A success message shows how many component sets were created
- If there were failures, the first failure is highlighted with the reason
- All components are bound to size variables automatically

### Best Practices for Icon Set Builder

1. **Icon Naming**: Use descriptive, lowercase names with hyphens (e.g., "heart-filled", "arrow-up", "more-options")
2. **Icon Design**: Keep strokes consistent (no fills) for best results with stroke weight variations
3. **Icon Size**: Design at a consistent bounding box size (usually 24px)
4. **Batch Processing**: When creating many icons, batch mode is more efficient than single mode
5. **Variable Binding**: Ensure size variables exist before using the builder—the plugin will skip binding if variables aren't found (but will still create components)

---

## Single Icon Builder

### Purpose

The Single Icon Builder creates a single 24px icon component. Use this when you only need a fixed-size icon component (not multiple sizes) or when you want to quickly convert an icon design into a usable component.

### Single Mode: Creating One Icon Component

**Step 1: Prepare Your Icon**
- Create a frame containing your icon artwork
- Name your frame something descriptive (e.g., "star")

**Step 2: Select the Frame**
- In Figma, select the frame containing your icon
- Open the Design System Builder plugin
- Click the "Single Icon Builder" tile

**Step 3: Enter Component Name**
- In the "Single Mode" section, enter a name for your component
- This will be the component name (e.g., "Star", "heart", "settings")

**Step 4: Create the Component**
- Click "Create Icon"
- The plugin will:
  - Extract your icon artwork
  - Create a 24px × 24px component
  - Apply a stroke weight of 2px
  - Bind the component to the `Icon size/24` variable
  - Position it next to your original frame

**Step 5: Use Your Component**
- Your new 24px icon component is ready to use in designs
- It's automatically bound to your size variable for consistency

### Batch Mode: Creating Multiple Icon Components

**Step 1: Prepare Multiple Icons**
- Create separate frames for each icon
- Name each frame after your desired component name
- Frame names will become component names (e.g., "heart", "star", "add")

**Step 2: Select All Frames**
- Select all frames containing icons (Shift+Click or drag selection)
- Open the Design System Builder plugin
- Click the "Single Icon Builder" tile

**Step 3: Create Components (Batch)**
- Click "Batch Mode" toggle or scroll to Batch Mode section
- Click "Create Icons"
- The plugin will:
  - Validate all frame names first
  - Create a 24px component for each frame
  - Stack components vertically with 80px spacing
  - Bind each to the `Icon size/24` variable

**Step 4: Review Results**
- Success message shows how many components were created
- If any failed, you'll see the first failure details
- All components are stacked vertically for easy review

### Best Practices for Single Icon Builder

1. **Use When**: You need a single-size icon or quick component creation
2. **Naming Convention**: Follow your design system naming convention (e.g., "icn-heart", "icon-star")
3. **Batch Processing**: Batch mode is ideal for creating many simple icon components at once
4. **Component Naming**: Use clear, searchable names that describe the icon's purpose
5. **Size Consistency**: All components are created at 24px; for multiple sizes, use Icon Set Builder instead

---

## Design System Features

### Size Variables

Both builders automatically bind component dimensions to design system size variables. This means:

- **What it means**: When you change the `Icon size/24` variable value in your design system, all 24px components will update their size accordingly
- **Benefits**:
  - Single source of truth for icon sizing
  - Easy to update all icon sizes across your design system
  - Consistency with other components in your design system
  - Automatic propagation to all uses of the component

### Variable Binding Details

**How it works**:
- Components bind their width and height to the corresponding size variable
- For example, a 24px component binds to `Icon size/24`
- When the variable value changes, component sizes update automatically

**Where to Find Variables**:
1. Open your Figma file
2. Go to Assets panel → Variables tab
3. Look for the "Icon size" collection
4. Edit the numeric values as needed (e.g., change `Icon size/24` from 24 to 28)
5. All components bound to that variable update immediately

**Creating or Editing Variables**:
1. In the Variables tab, find the Icon size collection
2. Click on a variable to edit its value
3. Change the numeric value to your desired size
4. All bound components update automatically
5. No need to rebuild components—the binding persists

---

## Best Practices

### File Organization

1. **Icon Frame Location**
   - Keep original icon frames together in one section of your file (e.g., "Icons - Source")
   - Keep generated components in a separate section (e.g., "Icons - Components")
   - This makes it easy to find and update icons

2. **Naming Conventions**
   - Use lowercase with hyphens: "heart-filled", "arrow-up-circle", "check-mark"
   - Avoid special characters: /, :, !, ?, *, etc.
   - Be descriptive but concise
   - Use consistent prefixes if needed (e.g., "icn-" for icons)

3. **Library Organization**
   - Place completed icon components in your design system library
   - Create a separate "Icons" section or page for organization
   - Group by category if needed (e.g., "Navigation Icons", "Status Icons")

### When to Use Each Builder

| Use Icon Set Builder when... | Use Single Icon Builder when... |
|---|---|
| You need icons at multiple sizes | You need only one size (24px) |
| You want size variants as options | You want simple, individual components |
| Icons need responsive sizing | Icons are fixed-size in usage |
| Part of a large design system | Creating quick components for a project |

### Troubleshooting Common Issues

**Problem: "Could not find variable" in console**
- **Cause**: Size variables don't exist in your Figma file
- **Solution**: Create the `Icon size` variable collection with all 7 sizes (see First Time Setup above)

**Problem: Icon looks distorted after creation**
- **Cause**: Original frame had non-square dimensions
- **Solution**: Adjust your original icon frame to be square (same width and height)

**Problem: Component name has invalid characters error**
- **Cause**: Frame name contains /, :, !, ?, *, or other special characters
- **Solution**: Rename your frame using only letters, numbers, and hyphens

**Problem: Components not appearing in expected location**
- **Cause**: Source frame was far off-canvas
- **Solution**: Ensure source frames are visible and properly positioned before creating components

---

## FAQ

### General Questions

**Q: Do I need variables to use this plugin?**
A: No, but variables are highly recommended. Components will still be created without variables, they just won't automatically update when variable values change.

**Q: Can I change component sizes after creation?**
A: If bound to variables, change the variable value. If not bound, you'll need to manually resize components or recreate them.

**Q: Can I use icons that have color fills?**
A: The plugin works best with stroke-based icons. Color fills will be preserved, but stroke weight optimization is designed for monochrome icons.

### Icons and Components

**Q: What file formats does the plugin support?**
A: The plugin works with any vector content in Figma (paths, groups, components). Simply place them in a frame.

**Q: Can I edit components after creation?**
A: Yes! Double-click to edit component content, or right-click to adjust component properties in the design system.

**Q: Can I export components to other files?**
A: Yes, copy components to your design system library file. The plugin creates components in your current file.

**Q: What if I create duplicate component names?**
A: Figma will add a number suffix (e.g., "heart", "heart 2"). Rename them to follow your naming convention.

### Batch Processing

**Q: How many icons can I process in batch mode?**
A: There's no hard limit, but processing 50+ icons at once may take a moment. Start with batches of 10-20 for best performance.

**Q: What happens if one frame fails in batch mode?**
A: The plugin validates all frames first. If any have invalid names, it stops and shows an error without processing anything. Fix the names and try again.

**Q: Can I batch process a mix of Icon Set and Single Icon modes?**
A: No, use each builder separately. Select all Icon Set icons with one builder, then select all Single Icon frames with the other.

### Variables and Design Systems

**Q: Do I need to update variables for every icon?**
A: No, variables are shared. Update `Icon size/24` once, and all 24px components update automatically.

**Q: Can I use this with design tokens?**
A: Not directly, but if your design tokens map to Figma variables, the variable binding will reflect those changes.

**Q: Can I bind to color variables?**
A: Currently, the plugin binds dimensions (width/height) to variables. Color binding is planned for a future update.

### Errors and Issues

**Q: The plugin is slow or unresponsive**
A: Try refreshing the plugin (close and reopen). Large files with many components can take longer to process.

**Q: Console shows errors but components were created**
A: Some errors (like variable binding) are non-critical. Components are still created, but features like variable binding may not have worked. Check the console for details.

**Q: Can I undo plugin changes?**
A: Yes, use Figma's standard undo (Cmd+Z on Mac, Ctrl+Z on Windows) to revert plugin actions.

### Workflow Questions

**Q: Can I edit source icons and regenerate components?**
A: Not automatically. Edit the source icon frame, then run the builder again to create updated components.

**Q: Should I keep source icon frames in my library file?**
A: It's optional. If you might need to regenerate or update components, keep source frames. Otherwise, you can delete them.

**Q: Can I share this plugin with my team?**
A: Yes, install the plugin in your workspace. All team members will have access.

---

## Need More Help?

If you have questions not covered here, check the plugin console for error messages (Plugins → Design System Builder, then right-click → Inspect). Error messages provide specific guidance on what went wrong and how to fix it.

For feature requests or bug reports, reach out to your design system team or the plugin maintainers.
