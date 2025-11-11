# Design System Builder - API Reference

Complete API documentation for developing with the Design System Builder plugin.

## Table of Contents
1. [Core Functions](#core-functions)
2. [Utility Functions](#utility-functions)
3. [Type Definitions](#type-definitions)
4. [Variable Binding API](#variable-binding-api)
5. [Message Protocol](#message-protocol)
6. [Error Handling](#error-handling)

---

## Core Functions

### iconSet.ts

#### `createIconSet()`

Creates a single icon component set with 7 size variants.

```typescript
export async function createIconSet(
  sourceNode: BaseNode,
  iconName: string,
  yPosition?: number,
  xPosition?: number
): Promise<void>
```

**Parameters**:
- `sourceNode`: The frame containing the icon artwork
- `iconName`: Name for the component set (e.g., "heart", "star")
- `yPosition`: Optional Y coordinate for component set placement
- `xPosition`: Optional X coordinate for component set placement

**Returns**: `Promise<void>` - Resolves when component set is created

**Behavior**:
1. Validates and extracts icon from source frame
2. Creates 7 component variants (12, 16, 20, 24, 32, 40, 48px)
3. Applies optimized stroke weights to each variant
4. Combines variants into a component set
5. Binds dimensions to size variables
6. Positions component set in the canvas
7. Zooms viewport to show result

**Throws**: Error if frame is invalid or icon extraction fails

**Example**:
```typescript
const selectedFrame = figma.currentPage.selection[0];
await createIconSet(selectedFrame, 'heart-filled', 100, 500);
```

---

#### `processBatch()`

Creates icon component sets for multiple frames in batch mode.

```typescript
export async function processBatch(
  selectedNodes: readonly BaseNode[]
): Promise<BuilderResult>
```

**Parameters**:
- `selectedNodes`: Array of frames containing icons

**Returns**: `BuilderResult` object with status and message

```typescript
interface BuilderResult {
  message: string;      // Summary of results
  isError?: boolean;    // True if any failures occurred
}
```

**Behavior**:
1. Validates all frame names first (stops on validation errors)
2. Processes each frame to create a component set
3. Stacks component sets vertically with 80px spacing
4. Returns summary of successes and failures

**Example**:
```typescript
const frames = figma.currentPage.selection;
const result = await processBatch(frames);

if (result.isError) {
  console.error('Failed:', result.message);
} else {
  console.log('Success:', result.message);
}
```

---

### iconSingle.ts

#### `createIconSingle()`

Creates a single 24px icon component.

```typescript
export async function createIconSingle(
  sourceNode: BaseNode,
  iconName: string,
  yPosition?: number,
  xPosition?: number
): Promise<void>
```

**Parameters**:
- `sourceNode`: The frame containing the icon artwork
- `iconName`: Name for the component (e.g., "star", "heart")
- `yPosition`: Optional Y coordinate for component placement
- `xPosition`: Optional X coordinate for component placement

**Returns**: `Promise<void>` - Resolves when component is created

**Behavior**:
1. Extracts icon from source frame
2. Creates 24px component
3. Applies 2px stroke weight
4. Binds to `Icon size/24` variable
5. Positions component in canvas

**Throws**: Error if frame is invalid

**Example**:
```typescript
const selectedFrame = figma.currentPage.selection[0];
await createIconSingle(selectedFrame, 'star');
```

---

#### `processBatchSingle()`

Creates multiple 24px icon components from selected frames.

```typescript
export async function processBatchSingle(
  selectedNodes: readonly BaseNode[]
): Promise<BuilderResult>
```

**Parameters**:
- `selectedNodes`: Array of frames containing icons

**Returns**: `BuilderResult` object with status

**Behavior**:
1. Validates all frame names first
2. Creates a 24px component for each frame
3. Stacks components vertically with 80px spacing
4. Returns summary message

**Example**:
```typescript
const result = await processBatchSingle(figma.currentPage.selection);
console.log(result.message);
```

---

## Utility Functions

### iconUtils.ts

#### `createIconComponent()`

Core function for creating a component at a specific size with variable binding.

```typescript
export async function createIconComponent(
  iconClone: BaseNode,
  size: number,
  strokeWeight: number,
  originalWidth: number,
  originalHeight: number
): Promise<ComponentNode>
```

**Parameters**:
- `iconClone`: Cloned icon node (already extracted)
- `size`: Target size in pixels (e.g., 24)
- `strokeWeight`: Stroke weight to apply (e.g., 2)
- `originalWidth`: Original icon width for scaling calculations
- `originalHeight`: Original icon height for scaling calculations

**Returns**: `ComponentNode` - The created component

**Process**:
1. Calculates scale factor to reach target size
2. Resizes icon to target size
3. Applies 83% scaling to prevent stroke cutoff
4. Applies stroke weight recursively
5. Creates frame and converts to component
6. Centers icon in frame
7. Binds to corresponding size variable
8. Logs binding status to console

**Important**: This function is async because it needs to look up variables.

**Example**:
```typescript
const component = await createIconComponent(
  iconClone,
  24,          // 24px size
  2,           // 2px stroke weight
  48,          // original width
  48           // original height
);
```

---

#### `applyStrokeWeightRecursive()`

Recursively applies stroke weight to all vector nodes.

```typescript
export function applyStrokeWeightRecursive(node: BaseNode, weight: number): void
```

**Parameters**:
- `node`: Starting node (any BaseNode)
- `weight`: Stroke weight value (e.g., 1.5)

**Behavior**:
1. If node has `strokeWeight` property, sets it
2. Recursively applies to all children
3. Works with groups, frames, and individual vectors

**Example**:
```typescript
applyStrokeWeightRecursive(iconFrame, 2);
```

---

#### `centerComponentsInFrame()`

Centers multiple components within a component set frame.

```typescript
export function centerComponentsInFrame(
  componentSet: ComponentSetNode,
  frameWidth: number,
  frameHeight: number
): void
```

**Parameters**:
- `componentSet`: The component set containing child components
- `frameWidth`: Width of the component set frame
- `frameHeight`: Height of the component set frame

**Behavior**:
1. Calculates total width of all components with spacing
2. Horizontally centers components
3. Vertically centers each component
4. Maintains 40px spacing between components

**Used By**: Icon Set builder to align multiple size variants

---

#### `styleComponentSet()`

Applies visual styling to component sets.

```typescript
export function styleComponentSet(componentSet: ComponentSetNode): void
```

**Applies**:
- Purple stroke (9747FF) with 1px weight
- Dashed stroke pattern (10px dash, 5px gap)
- 16px padding on all sides
- Inside stroke alignment

**Customization**: Edit the function to change styling

---

#### `setComponentConstraints()`

Sets responsive constraints on component frames.

```typescript
export function setComponentConstraints(componentSet: ComponentSetNode): void
```

**Sets**:
- Component frame constraints: Center/Center
- Icon constraints: Center/Center

**Purpose**: Ensures icons stay centered when component size changes

---

### shared.ts

#### `validateAndExtractWorkingFrame()`

Validates a node and extracts icon vector content.

```typescript
export function validateAndExtractWorkingFrame(sourceNode: BaseNode): {
  workingFrame: FrameNode | null;
  vectors: VectorNode[];
  originalWidth: number;
  originalHeight: number;
}
```

**Parameters**:
- `sourceNode`: Node to validate and extract from

**Returns**: Object containing:
- `workingFrame`: Created temporary frame (for cleanup)
- `vectors`: Extracted vector nodes
- `originalWidth`: Width of source
- `originalHeight`: Height of source

**Behavior**:
1. Validates that node is a valid frame
2. Handles nested structures (groups, components)
3. Extracts vector content
4. Creates temporary working frame
5. Flattens complex structures

**Throws**: Error if validation fails

---

#### `isValidName()`

Validates component names for invalid characters.

```typescript
export function isValidName(name: string): boolean
```

**Parameters**:
- `name`: Component or frame name to validate

**Returns**: `true` if name is valid, `false` if invalid

**Disallows**: `/`, `:`, `!`, `?`, `*`

**Example**:
```typescript
isValidName('heart-filled');  // true
isValidName('heart:filled');  // false (contains :)
```

---

## Type Definitions

### BuilderResult

```typescript
export interface BuilderResult {
  message: string;
  isError?: boolean;
}
```

**Properties**:
- `message`: Summary message for display
- `isError`: Optional boolean, true if operation failed

---

### Size Mapping

```typescript
const SIZES_AND_WEIGHTS: { [key: number]: number } = {
  12: 1,
  16: 1.25,
  20: 1.5,
  24: 2,
  32: 2.5,
  40: 3,
  48: 3.5
};
```

Maps pixel sizes to optimized stroke weights.

---

## Variable Binding API

### Finding Variables

```typescript
async function getVariable(size: number): Promise<Variable | null>
```

**Parameters**:
- `size`: Size number (12, 16, 20, 24, 32, 40, 48)

**Returns**: Variable object or null if not found

**Implementation**:
```typescript
const variables = await figma.variables.getLocalVariablesAsync();
const variablePath = `Icon size/${size}`;

for (const variable of variables) {
  if (variable.name === variablePath) {
    return variable;
  }
}
return null;
```

---

### Binding to Variables

```typescript
const variable = await getVariable(size);
if (variable) {
  component.setBoundVariable('width', variable);
  component.setBoundVariable('height', variable);
}
```

**Important**:
- Use Variable object, not ID
- Both width and height must be bound
- Check console for binding confirmation logs

---

## Message Protocol

Communication between code.ts and ui.html uses a message-based API.

### UI → Plugin Messages

#### create-icon-set

Trigger Icon Set builder.

```typescript
{
  type: 'create-icon-set',
  iconName: string,      // Name for component set
  batchMode: boolean,    // true if batch processing
  yPosition?: number,    // Optional Y position
  xPosition?: number     // Optional X position
}
```

---

#### create-icon-single

Trigger Single Icon builder.

```typescript
{
  type: 'create-icon-single',
  iconName: string,      // Name for component
  batchMode: boolean,    // true if batch processing
  yPosition?: number,    // Optional Y position
  xPosition?: number     // Optional X position
}
```

---

### Plugin → UI Messages

#### Success Response

```typescript
{
  type: 'create-icon-set' | 'create-icon-single',
  success: true,
  message?: string       // Optional result message
}
```

---

#### Error Response

```typescript
{
  type: 'create-icon-set' | 'create-icon-single',
  success: false,
  error: string         // Error message for user
}
```

---

## Error Handling

### Common Errors

#### "Could not find variable for size X"

**Cause**: Size variable doesn't exist in file

**Solution**:
1. Create variable collection "Icon size"
2. Add variables: Icon size/12, Icon size/16, etc.
3. Set values to their sizes
4. Try again

---

#### "Invalid frame name"

**Cause**: Frame name contains invalid characters (/, :, !, ?, *)

**Solution**: Rename frame using only letters, numbers, and hyphens

---

#### "Failed to extract icon"

**Cause**: Frame structure is invalid or not recognized

**Solution**:
1. Ensure frame contains vector content
2. Try selecting a simpler frame structure
3. Check console for detailed error

---

### Debugging Tips

1. **Check Console**: Plugins → Design System Builder → Right-click → Inspect
2. **Look for Binding Logs**: "✓ Bound component to Icon size/X variable"
3. **Verify Variables**: Assets → Variables, look for Icon size collection
4. **Test Incrementally**: Try single mode before batch mode

---

## Constants

```typescript
// Spacing between components
const SPACING = 40;

// Icon Set dimensions
const COMPONENT_SET_WIDTH = 464;
const COMPONENT_SET_HEIGHT = 80;

// Single Icon dimensions
const ICON_SIZE = 24;
const STROKE_WEIGHT = 2;
```

---

## Extending the API

To add new builder functions:

1. Create new file following naming convention: `{feature}Builder.ts`
2. Implement two functions:
   - `create{Feature}()` - Single mode
   - `processBatch{Feature}()` - Batch mode
3. Update `code.ts` to handle new message type
4. Add UI elements to `ui.html`
5. Test thoroughly before merging

---

**Last Updated**: November 2024
**API Version**: 1.0
