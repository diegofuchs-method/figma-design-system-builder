/**
 * Icon Set Builder - Creates component sets with 7 sizes and optimized stroke weights
 */

import {
  applyStrokeWeightRecursive,
  createIconComponent,
  centerComponentsInFrame,
  styleComponentSet,
  setComponentConstraints,
  SPACING
} from './iconUtils';
import { validateAndExtractWorkingFrame, isValidName, BuilderResult } from './shared';

// Map sizes to their corresponding stroke weights
const SIZES_AND_WEIGHTS: { [key: number]: number } = {
  12: 1,
  16: 1.25,
  20: 1.5,
  24: 2,
  32: 2.5,
  40: 3,
  48: 3.5
};

const COMPONENT_SET_WIDTH = 464;
const COMPONENT_SET_HEIGHT = 80;

/**
 * Process batch mode: create icon sets for multiple selected frames
 */
export async function processBatch(selectedNodes: readonly BaseNode[]): Promise<BuilderResult> {
  // FIRST PASS: Validate all frame names before processing anything
  const invalidFrames: string[] = [];

  for (const node of selectedNodes) {
    const nodeName = (node as any).name || 'Unnamed';

    // Check for invalid characters in frame name
    if (!isValidName(nodeName)) {
      invalidFrames.push(nodeName);
    }
  }

  // If there are any naming issues, return error without processing anything
  if (invalidFrames.length > 0) {
    let message = `${invalidFrames.length} frame${invalidFrames.length !== 1 ? 's' : ''} ${
      invalidFrames.length !== 1 ? 'have' : 'has'
    } invalid characters in name:\n`;
    for (let i = 0; i < invalidFrames.length; i++) {
      message += '• ' + invalidFrames[i];
      if (i < invalidFrames.length - 1) {
        message += '\n';
      }
    }
    return { message, isError: true };
  }

  // SECOND PASS: All names are valid, process all frames
  const successes: string[] = [];
  const failures: { name: string; reason: string }[] = [];

  let currentYPos = 0;
  const firstNode = selectedNodes[0] as any;
  let yStartPos = firstNode.y;
  // Calculate X position based on first frame (all batch sets align to this)
  const xPosition = firstNode.x + firstNode.width + 40;

  for (const node of selectedNodes) {
    const nodeName = (node as any).name || 'Unnamed';

    try {
      // Check if node is valid
      if (!('clone' in node)) {
        failures.push({
          name: nodeName,
          reason: 'not a valid frame'
        });
        continue;
      }

      // Create component set with calculated Y position for vertical stacking
      // and fixed X position for left alignment
      const yPosition = yStartPos + currentYPos;
      await createIconSet(node, nodeName, yPosition, xPosition);

      successes.push(nodeName);

      // Update Y position for next component set (height 80px + 80px spacing)
      currentYPos += COMPONENT_SET_HEIGHT + 80;
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'unknown error';
      failures.push({
        name: nodeName,
        reason: reason
      });
    }
  }

  // Build summary message
  let message = '';
  if (successes.length > 0) {
    message = `Created ${successes.length} component set${successes.length !== 1 ? 's' : ''}`;
  }

  if (failures.length > 0) {
    if (message) {
      message += `. ${failures.length} failed`;
    } else {
      message = `Failed to create component sets`;
    }

    // Add first failure detail if any
    if (failures.length > 0) {
      message += `: ${failures[0].name} (${failures[0].reason})`;
    }

    return { message, isError: true };
  }

  return { message };
}

/**
 * Create an icon set with 7 sizes and variants
 */
export async function createIconSet(
  sourceNode: BaseNode,
  iconName: string,
  yPosition?: number,
  xPosition?: number
): Promise<void> {
  let workingFrame: FrameNode | null = null;

  try {
    // Validate and extract working frame
    const extraction = validateAndExtractWorkingFrame(sourceNode);
    workingFrame = extraction.workingFrame;
    const flattenedVector = extraction.vectors[0];
    const originalWidth = extraction.originalWidth;
    const originalHeight = extraction.originalHeight;

    // Step 2: Create 7 size variants based on icon size
    const components: ComponentNode[] = [];

    // For batch mode, use the provided xPosition for left alignment
    // For single mode, calculate position based on the selected frame
    const startX = xPosition !== undefined ? xPosition : (sourceNode as any).x + (sourceNode as any).width + 40;
    let xPos = startX;
    const frameYPos = yPosition !== undefined ? yPosition : (sourceNode as any).y;

    for (const [size, strokeWeight] of Object.entries(SIZES_AND_WEIGHTS)) {
      const sizeNum = parseInt(size);

      // Clone the original flattened vector
      const iconClone = flattenedVector.clone();

      // Create icon component
      const component = await createIconComponent(iconClone, sizeNum, strokeWeight, originalWidth, originalHeight);

      // Position the frame
      component.x = xPos;
      component.y = frameYPos;
      xPos += component.width + SPACING;

      components.push(component);
    }

    // Step 3: Combine as variants
    if (components.length > 1) {
      const componentSet = figma.combineAsVariants(components, figma.currentPage, 0) as ComponentSetNode;

      // Set the component set name to the icon name
      componentSet.name = iconName;

      // Resize the component set frame to specific dimensions
      componentSet.resize(COMPONENT_SET_WIDTH, COMPONENT_SET_HEIGHT);

      // Center align the components within the frame
      centerComponentsInFrame(componentSet, COMPONENT_SET_WIDTH, COMPONENT_SET_HEIGHT);

      // Apply the component set styling
      styleComponentSet(componentSet);

      // Set constraints
      setComponentConstraints(componentSet);

      // Zoom to show the component set
      figma.viewport.scrollAndZoomIntoView([componentSet]);
    }
  } catch (error) {
    // Clean up the working frame on error
    if (workingFrame && 'remove' in workingFrame) {
      workingFrame.remove();
    }
    throw error;
  }

  // Clean up the working frame
  if (workingFrame && 'remove' in workingFrame) {
    workingFrame.remove();
  }
}
