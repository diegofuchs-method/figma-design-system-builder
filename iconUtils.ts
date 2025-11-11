/**
 * Shared utilities for icon creation and manipulation
 */

const SPACING = 40;

/**
 * Recursively applies stroke weight to all vectors in a node
 */
export function applyStrokeWeightRecursive(node: BaseNode, weight: number): void {
  if ('strokeWeight' in node) {
    (node as any).strokeWeight = weight;
  }

  if ('children' in node) {
    const children = (node as any).children;
    if (children && Array.isArray(children)) {
      children.forEach((child: BaseNode) => {
        applyStrokeWeightRecursive(child, weight);
      });
    }
  }
}

/**
 * Recursively applies a stroke color style to all vectors in a node
 */
function applyStrokeStyleRecursive(node: BaseNode, styleId: string): void {
  if ('strokeStyleId' in node) {
    (node as any).strokeStyleId = styleId;
  }

  if ('children' in node) {
    const children = (node as any).children;
    if (children && Array.isArray(children)) {
      children.forEach((child: BaseNode) => {
        applyStrokeStyleRecursive(child, styleId);
      });
    }
  }
}

/**
 * Finds a variable by size number (e.g., 24 -> "Icon size/24")
 */
async function getVariable(size: number): Promise<Variable | null> {
  try {
    const variables = await figma.variables.getLocalVariablesAsync();

    // Variables in Figma use the path format: "Icon size/24"
    const variablePath = `Icon size/${size}`;

    for (const variable of variables) {
      if (variable.name === variablePath) {
        return variable;
      }
    }

    return null;
  } catch (e) {
    console.error('Error getting variables:', e);
    return null;
  }
}

/**
 * Finds a color style by name (e.g., "Grey/Grey-Primary")
 */
function getColorStyle(stylePath: string): PaintStyle | null {
  try {
    const styles = figma.getLocalPaintStyles();

    console.log(`Looking for color style: "${stylePath}"`);
    console.log(`Total paint styles found: ${styles.length}`);

    for (const style of styles) {
      console.log(`  - Style name: "${style.name}"`);
      if (style.name === stylePath) {
        console.log(`  ✓ MATCHED!`);
        return style;
      }
    }

    console.log(`Color style "${stylePath}" not found`);
    return null;
  } catch (e) {
    console.error('Error getting color styles:', e);
    return null;
  }
}

/**
 * Creates a component frame for an icon at a specific size with stroke weight
 */
export async function createIconComponent(
  iconClone: BaseNode,
  size: number,
  strokeWeight: number,
  originalWidth: number,
  originalHeight: number
): Promise<ComponentNode> {
  // Calculate scale factor to reach target size from original dimensions
  const maxOriginalDim = Math.max(originalWidth, originalHeight);
  const scaleFactor = size / maxOriginalDim;

  // Resize the icon to target size (before applying 83% scaling)
  (iconClone as any).resize(originalWidth * scaleFactor, originalHeight * scaleFactor);

  // Now apply 83% scaling to prevent stroke cutoff
  const scaledWidth = (iconClone as any).width;
  const scaledHeight = (iconClone as any).height;
  const scaledSize83Width = scaledWidth * 0.83;
  const scaledSize83Height = scaledHeight * 0.83;

  // Calculate centering offset for the 83% scaling
  const offsetXFor83 = (scaledWidth - scaledSize83Width) / 2;
  const offsetYFor83 = (scaledHeight - scaledSize83Height) / 2;

  // Apply the 83% scaling
  (iconClone as any).resize(scaledSize83Width, scaledSize83Height);
  (iconClone as any).x += offsetXFor83;
  (iconClone as any).y += offsetYFor83;

  // Apply stroke weight
  applyStrokeWeightRecursive(iconClone, strokeWeight);

  // Apply stroke color style
  const colorStyle = getColorStyle('Grey/Grey-Primary');
  if (colorStyle) {
    applyStrokeStyleRecursive(iconClone, colorStyle.id);
    console.log(`✓ Applied Grey/Grey-Primary stroke style`);
  } else {
    console.log(`Could not find Grey/Grey-Primary color style`);
  }

  // Rename the icon
  iconClone.name = 'Icon';

  // Create a frame for this size variant
  const frame = figma.createFrame();
  frame.resize(size, size);
  // Remove the default white fill
  frame.fills = [];
  frame.appendChild(iconClone);

  // Center the icon in the frame
  const finalWidth = (iconClone as any).width;
  const finalHeight = (iconClone as any).height;
  const offsetX = (size - finalWidth) / 2;
  const offsetY = (size - finalHeight) / 2;
  iconClone.x = offsetX;
  iconClone.y = offsetY;

  // Name the frame with the size property
  frame.name = `Size=${size}`;

  // Create component from the frame
  const component = figma.createComponentFromNode(frame);

  // Bind width and height to the "Icon size/{size}" variable
  try {
    const variable = await getVariable(size);
    if (variable) {
      const componentAny = component as any;

      // Use the new API which expects the Variable object instead of ID
      if (componentAny.setBoundVariable) {
        componentAny.setBoundVariable('width', variable);
        componentAny.setBoundVariable('height', variable);
        console.log(`✓ Bound component to Icon size/${size} variable`);
      } else {
        console.log(`Component doesn't support variable binding`);
      }
    } else {
      console.log(`Could not find variable for size ${size}`);
    }
  } catch (e) {
    // If variable binding fails, the component still works without it
    console.error('Variable binding error:', e);
  }

  return component;
}

/**
 * Centers components in a component set frame
 */
export function centerComponentsInFrame(
  componentSet: ComponentSetNode,
  frameWidth: number,
  frameHeight: number
): void {
  // Calculate total width of all components with spacing
  let totalComponentWidth = 0;
  const componentSetChildren = (componentSet as any).children;
  if (componentSetChildren && Array.isArray(componentSetChildren)) {
    for (let i = 0; i < componentSetChildren.length; i++) {
      const child = componentSetChildren[i];
      totalComponentWidth += (child as any).width;
      // Add spacing between components (not after the last one)
      if (i < componentSetChildren.length - 1) {
        totalComponentWidth += SPACING;
      }
    }

    // Calculate centering offsets
    const horizontalOffset = (frameWidth - totalComponentWidth) / 2;

    // Reposition each component to be centered
    let xPos = horizontalOffset;
    for (const child of componentSetChildren) {
      const childAny = child as any;
      // Center each component individually based on its own height
      const verticalOffset = (frameHeight - childAny.height) / 2;
      childAny.x = xPos;
      childAny.y = verticalOffset;
      xPos += childAny.width + SPACING;
    }
  }
}

/**
 * Applies component set styling (dashed border, padding, etc.)
 */
export function styleComponentSet(componentSet: ComponentSetNode): void {
  try {
    const componentSetAny = componentSet as any;

    // Add a dashed stroke to match Figma's component set appearance
    const stroke: Paint = {
      type: 'SOLID',
      color: { r: 0.59, g: 0.28, b: 1.0 }, // 9747FF in RGB
      opacity: 1
    };

    if ('strokes' in componentSetAny) {
      componentSetAny.strokes = [stroke];
    }

    if ('strokeWeight' in componentSetAny) {
      componentSetAny.strokeWeight = 1;
    }

    if ('strokeDashPattern' in componentSetAny) {
      componentSetAny.strokeDashPattern = [10, 5]; // Dash 10, Gap 5
    }

    if ('strokeAlign' in componentSetAny) {
      componentSetAny.strokeAlign = 'INSIDE';
    }

    // Add 16px padding around the components
    if ('paddingLeft' in componentSetAny) {
      componentSetAny.paddingLeft = 16;
    }
    if ('paddingRight' in componentSetAny) {
      componentSetAny.paddingRight = 16;
    }
    if ('paddingTop' in componentSetAny) {
      componentSetAny.paddingTop = 16;
    }
    if ('paddingBottom' in componentSetAny) {
      componentSetAny.paddingBottom = 16;
    }
  } catch (e) {
    // If we can't style the component set, that's okay - it still works
  }
}

/**
 * Sets constraints on component frames and their icons
 */
export function setComponentConstraints(componentSet: ComponentSetNode): void {
  const finalComponentChildren = (componentSet as any).children;
  if (finalComponentChildren && Array.isArray(finalComponentChildren)) {
    for (const component of finalComponentChildren) {
      // Set frame constraints to Center/Center
      if ('constraints' in component) {
        (component as any).constraints = {
          horizontal: 'CENTER',
          vertical: 'CENTER'
        };
      }

      // Set Icon vector constraints to Center/Center
      const componentChildren = (component as any).children;
      if (componentChildren && Array.isArray(componentChildren)) {
        for (const child of componentChildren) {
          if (child && child.name === 'Icon' && 'constraints' in child) {
            (child as any).constraints = {
              horizontal: 'CENTER',
              vertical: 'CENTER'
            };
          }
        }
      }
    }
  }
}

export { SPACING };
