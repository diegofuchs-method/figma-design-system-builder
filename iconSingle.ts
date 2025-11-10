/**
 * Icon Single Builder - Creates a single 24px component from an icon
 */

import {
  applyStrokeWeightRecursive,
  createIconComponent
} from './iconUtils';
import { validateAndExtractWorkingFrame, isValidName, BuilderResult } from './shared';

const ICON_SIZE = 24;
const STROKE_WEIGHT = 2;

/**
 * Process batch mode: create single 24px icons for multiple selected frames
 */
export async function processBatchSingle(selectedNodes: readonly BaseNode[]): Promise<BuilderResult> {
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

      // Create icon component with calculated Y position for vertical stacking
      // and fixed X position for left alignment
      const yPosition = yStartPos + currentYPos;
      await createIconSingle(node, nodeName, yPosition, xPosition);

      successes.push(nodeName);

      // Update Y position for next component (height 48px + 80px spacing)
      currentYPos += 48 + 80;
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
    message = `Created ${successes.length} icon component${successes.length !== 1 ? 's' : ''}`;
  }

  if (failures.length > 0) {
    if (message) {
      message += `. ${failures.length} failed`;
    } else {
      message = `Failed to create icon components`;
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
 * Create a single 24px icon component
 */
export async function createIconSingle(
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

    // Clone the icon
    const iconClone = flattenedVector.clone();

    // Create icon component (this creates a frame with the icon inside)
    const component = createIconComponent(
      iconClone,
      ICON_SIZE,
      STROKE_WEIGHT,
      originalWidth,
      originalHeight
    );

    // Position the component
    const startX = xPosition !== undefined ? xPosition : (sourceNode as any).x + (sourceNode as any).width + 40;
    const frameYPos = yPosition !== undefined ? yPosition : (sourceNode as any).y;

    component.x = startX;
    component.y = frameYPos;

    // Set the component name to the icon name
    component.name = iconName;

    // Zoom to show the component
    figma.viewport.scrollAndZoomIntoView([component]);
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
