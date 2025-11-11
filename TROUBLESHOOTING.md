# Design System Builder - Troubleshooting Guide

Quick solutions to common issues with the Design System Builder plugin.

## Table of Contents
1. [Installation & Setup](#installation--setup)
2. [Variable Binding Issues](#variable-binding-issues)
3. [Component Creation Issues](#component-creation-issues)
4. [UI & Navigation Issues](#ui--navigation-issues)
5. [Batch Processing Issues](#batch-processing-issues)
6. [Performance Issues](#performance-issues)
7. [Advanced Troubleshooting](#advanced-troubleshooting)

---

## Installation & Setup

### Plugin Won't Open

**Symptoms**: Plugin doesn't appear in Plugins menu or crashes on open

**Solutions**:

1. **Reinstall the plugin**
   - Plugins → Design plugins → Uninstall Design System Builder
   - Restart Figma
   - Reinstall from Figma Community

2. **Clear browser cache** (for web version)
   - Chrome DevTools → Application → Clear storage
   - Reload Figma

3. **Check file compatibility**
   - Use Figma desktop app (recommended)
   - Ensure you're on latest Figma version

---

### Variables Not Appearing

**Symptoms**: "Could not find variable" error, or variables don't bind

**Quick Checklist**:
```
□ Figma file has "Icon size" variable collection
□ All size variables exist (12, 16, 20, 24, 32, 40, 48)
□ Variables have numeric values (not strings)
□ No typos in variable names
```

**Solution Steps**:

1. **Verify variables exist**
   - Go to Assets → Variables
   - Look for "Icon size" collection
   - Should have 7 variables listed

2. **Check variable names**
   - Variable names must be exactly: `Icon size/12`, `Icon size/16`, etc.
   - No extra spaces or different naming

3. **Create missing variables**
   - Click "Create variable" in Variables panel
   - Name: `Icon size/{size}` (e.g., `Icon size/24`)
   - Value: `24` (numeric, not text)
   - Repeat for all sizes

4. **Verify values**
   - Each variable's value should match its size
   - `Icon size/24` = 24
   - `Icon size/12` = 12
   - etc.

---

## Variable Binding Issues

### "Could not find variable for size X"

**Where you see it**: Plugin console or notification

**Cause**: Size variable doesn't exist in the file

**Full Solution**:

1. **Open Variables panel**
   - Assets → Variables

2. **Create variable collection**
   - Click "Create variable collection" (if not exists)
   - Name it exactly: `Icon size`

3. **Add all required variables**
   ```
   Icon size/12   = 12
   Icon size/16   = 16
   Icon size/20   = 20
   Icon size/24   = 24
   Icon size/32   = 32
   Icon size/40   = 40
   Icon size/48   = 48
   ```

4. **Try creating components again**

---

### Components Don't Bind to Variables

**Symptoms**: Components created but not bound to variables

**Check Console**:
1. Plugins → Design System Builder → Right-click → Inspect
2. Look for messages like "✓ Bound component to Icon size/24 variable"
3. Or error messages like "Could not find variable"

**Likely Causes**:

| Issue | Check |
|-------|-------|
| Variables don't exist | See "Variables Not Appearing" above |
| Variable names don't match | Exactly `Icon size/24`, no variations |
| File doesn't have write permissions | Check file permissions/sharing settings |
| Figma plugin API issue | Try refreshing plugin (close/reopen) |

---

### Variable Values Don't Update Components

**Symptoms**: Changed variable value, but components don't update

**Likely Causes**:

1. **Components aren't actually bound**
   - Check console logs for "✓ Bound" messages
   - If not binding, see "Components Don't Bind to Variables" above

2. **Only updating the variable collection**
   - Make sure you're updating the MODE/VALUE
   - Not just renaming the collection

3. **Figma bug or cache issue**
   - Try refreshing the file
   - Close/reopen file
   - Restart Figma

**Solution**:
1. Select a bound component
2. Go to Design panel → Variables section
3. Should see variable name under width/height
4. Edit variable value in Variables panel
5. Component should update immediately

---

## Component Creation Issues

### "Invalid frame name" Error

**Cause**: Frame name contains characters that aren't allowed

**Not Allowed**:
- `/` (forward slash)
- `:` (colon)
- `!` (exclamation)
- `?` (question mark)
- `*` (asterisk)

**Solution**:
1. Find frames with invalid names (error message will list them)
2. Rename using only: letters, numbers, hyphens, underscores
3. Try again

**Good Examples**:
- `heart-filled`
- `arrow_up`
- `icon24`
- `menu-3-dots`

---

### Icon Looks Distorted

**Symptoms**: Icon appears stretched or squashed after creation

**Causes**:
1. Original frame wasn't square
2. Icon had uneven dimensions
3. Nested complex structure

**Solutions**:

1. **Make frame square**
   - Select original icon frame
   - Manually set width = height
   - Try creating component again

2. **Simplify icon structure**
   - Group all elements in icon
   - Make sure no extra layers outside group
   - Try creating component again

3. **Check for transforms**
   - Icon shouldn't have rotation or skew
   - Flatten transforms before creating component

---

### "Not a valid frame" Error

**Cause**: Selected node isn't a frame or can't be processed

**Check**:
- Is the selected item a Frame? (not a group or component)
- Is it empty? (no content inside)
- Does it contain vectors? (not just text or shapes)

**Solution**:
1. Select a Frame (not a Group)
2. Ensure it contains vector artwork
3. Try creating component again

---

### Component Created but Positioned Incorrectly

**Symptoms**: Component appears in wrong location on canvas

**This is Normal**: Components are positioned relative to source frames

**Why**: Plugin calculates position based on:
- Original frame position
- Frame width/height
- 40px offset

**If you want to reposition**:
1. Select the component
2. Drag it where you want
3. No need to recreate

---

## UI & Navigation Issues

### Back Button Doesn't Work

**Symptoms**: Clicking back button doesn't return to landing screen

**Solution**:

1. **Refresh the plugin**
   - Close plugin (X button)
   - Open plugin again

2. **Hard refresh**
   - Plugins → Design plugins → Manage
   - Toggle Design System Builder off/on

3. **Restart Figma**
   - Close Figma completely
   - Reopen Figma
   - Reopen plugin

---

### UI Elements Not Responsive

**Symptoms**: Buttons don't respond, text field not editable

**Solution**:

1. **Click inside plugin window first**
   - Make sure plugin has focus
   - Then interact with elements

2. **Refresh plugin**
   - Close and reopen

3. **Update Figma**
   - Make sure you're on latest Figma version
   - Check Help → Check for updates

---

### Landing Screen Won't Display

**Symptoms**: Plugin opens blank or shows builder view without option to go back

**Solution**:

1. **Manual refresh**
   - Close plugin
   - Reopen from Plugins menu

2. **Restart Figma**
   - Close Figma
   - Reopen

3. **Reinstall plugin** (if above don't work)
   - Uninstall Design System Builder
   - Restart Figma
   - Reinstall from Figma Community

---

## Batch Processing Issues

### "X frames have invalid characters"

**Cause**: One or more selected frames have invalid names

**Solution**:
1. Note which frames have issues (error lists them)
2. Rename each frame to remove invalid characters
3. Select all frames again
4. Try batch processing again

**Valid Names** contain only: letters, numbers, hyphens, underscores

---

### Batch Processing Stops After First Item

**Cause**: First frame failed validation or processing

**Check Console** for specific error on first frame

**Solution**:
1. Look at error message in console
2. Fix the issue with first frame
3. Try batch processing again

---

### Some Frames Fail in Batch

**Cause**: Each frame is processed independently

**In Results**:
- Success count shows how many worked
- Error message shows first failure
- Components are created for successful frames

**Solution**:
1. Check which ones failed
2. Fix those specific frames
3. Reprocess just the failed frames

---

### Performance Slow with Large Batch

**Symptoms**: Creating 50+ components takes very long time

**Expected**: Processing time scales with number of frames

**Solutions**:

1. **Process in smaller batches**
   - Do 10-20 frames at a time
   - Faster and gives feedback

2. **Close other plugins**
   - Plugin performance affects Figma
   - Close unnecessary plugins/files

3. **Upgrade file storage** (if on older file)
   - Large files can slow plugin processing
   - Consider archiving old assets

4. **Check system resources**
   - Close unnecessary apps
   - Restart Figma
   - Check available RAM

---

## Performance Issues

### Plugin Becomes Unresponsive

**Symptoms**: Plugin freezes, buttons don't respond, UI lags

**Quick Fix**:
1. Close plugin (click X)
2. Wait a moment
3. Reopen plugin

**If that doesn't work**:
1. Close Figma completely
2. Wait 10 seconds
3. Reopen Figma and plugin

---

### Creating Components Takes Very Long

**Normal Processing Times**:
- Single Icon: 1-2 seconds
- Icon Set (7 sizes): 3-5 seconds
- Batch of 10 Icon Sets: 30-50 seconds

**If Taking Longer**:
1. Check file size (File → File info)
2. Check Figma performance (Figma menu → Plugins → Disabled some plugins)
3. Try smaller batch sizes

---

### Memory Issues or Crashes

**Symptoms**: Figma crashes during batch processing, "Out of memory" errors

**Solutions**:

1. **Process smaller batches**
   - Do 10-20 frames instead of 50+
   - Less memory per batch

2. **Clean up file**
   - Delete unused assets
   - Archive old components
   - Flatten unnecessary groups

3. **Restart Figma**
   - Close Figma
   - Reopen
   - Try again with smaller batch

4. **Check system memory**
   - Close unnecessary apps
   - Check available RAM
   - Consider restarting computer

---

## Advanced Troubleshooting

### Checking Console Logs

**Access Console**:
1. In Figma, select Plugins → Design System Builder
2. Right-click on plugin window
3. Click "Inspect"
4. Go to Console tab

**Look for**:
- `✓ Bound component to Icon size/X variable` - Successful binding
- `Could not find variable for size X` - Variable doesn't exist
- `Error:` messages - Specific errors

---

### Variable Binding Logs

**Expected Output** in console:
```
✓ Bound component to Icon size/12 variable
✓ Bound component to Icon size/16 variable
✓ Bound component to Icon size/20 variable
✓ Bound component to Icon size/24 variable
✓ Bound component to Icon size/32 variable
✓ Bound component to Icon size/40 variable
✓ Bound component to Icon size/48 variable
```

If you see "Could not find variable" instead, variables don't exist.

---

### File Permissions

**If components won't create**:
1. Check if you have edit access to file
2. Check if file is in a shared team library
3. Some restrictions may prevent component creation

**Solution**:
- Ask file owner for edit permissions
- Duplicate file to your workspace
- Try creating components in duplicated file

---

### Reporting Issues

If you've tried all solutions above:

1. **Collect Information**
   - Screenshot of error
   - Console log messages
   - Steps to reproduce
   - File name/type
   - Figma version

2. **Check for Updates**
   - Make sure plugin is latest version
   - Update Figma to latest
   - Try again

3. **Contact Support**
   - Share collected information
   - Mention solutions already tried
   - Provide minimal file to reproduce issue

---

## Common Questions

### Q: Can I use this plugin with design tokens?

**A**: Not directly, but if your design tokens are mapped to Figma variables, the binding will work. The variable values will reflect your token values.

### Q: Will this work offline?

**A**: No, Figma plugins require internet connection. Make sure you're online when using the plugin.

### Q: Can I undo plugin actions?

**A**: Yes, use standard Figma undo (Cmd+Z on Mac, Ctrl+Z on Windows). This undoes all component creation.

### Q: Can I use this on a team library file?

**A**: Yes, if you have edit permissions. Make sure you're not in view-only mode.

### Q: Does this work with protected/locked files?

**A**: No, files must be editable. Unlock and ensure you have edit permissions.

### Q: How do I know if variables bound successfully?

**A**: Check plugin console (Inspect plugin). Should show "✓ Bound component to Icon size/X variable" for each component.

---

**Need More Help?** Contact your design system team or check the plugin documentation.

**Last Updated**: November 2024
