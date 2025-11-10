/**
 * Shared utilities across all builders
 */

export interface BuilderMessage {
  type: string;
  [key: string]: any;
}

export interface BuilderResult {
  message: string;
  isError?: boolean;
}

/**
 * Validates node name for valid characters
 */
export function isValidName(name: string): boolean {
  const validName = /^[a-zA-Z0-9_ -]+$/;
  return validName.test(name);
}

/**
 * Extracts vector children from a group
 */
export function getVectorsFromGroup(group: BaseNode): BaseNode[] {
  const groupChildren = (group as any).children;
  if (!Array.isArray(groupChildren) || groupChildren.length === 0) {
    throw new Error('Group must contain vector objects');
  }

  const vectors: BaseNode[] = [];
  for (const child of groupChildren) {
    if (child && child.type === 'VECTOR') {
      vectors.push(child);
    }
  }

  if (vectors.length === 0) {
    throw new Error('Group must contain at least one VECTOR');
  }

  return vectors;
}

/**
 * Validates and extracts the working frame structure
 */
export function validateAndExtractWorkingFrame(sourceNode: BaseNode): {
  workingFrame: FrameNode;
  vectors: BaseNode[];
  originalWidth: number;
  originalHeight: number;
} {
  const workingFrame = sourceNode.clone() as FrameNode;

  if (!('children' in workingFrame)) {
    throw new Error('Selected node must be a frame');
  }

  const children = (workingFrame as any).children;
  if (!Array.isArray(children) || children.length === 0) {
    throw new Error('Frame must have children');
  }

  // Get the first child (should be the group)
  const firstChild = children[0];
  if (firstChild.type !== 'GROUP') {
    throw new Error('First child of frame must be a GROUP');
  }

  // Get vectors from the group
  const vectors = getVectorsFromGroup(firstChild);

  // Flatten all vectors into one
  const flattenedVector = figma.flatten(vectors);
  flattenedVector.name = 'Icon';

  // Capture the original icon dimensions
  const originalWidth = (flattenedVector as any).width;
  const originalHeight = (flattenedVector as any).height;

  // Ungroup the group - this moves the flattened vector out and removes the group
  figma.ungroup(firstChild);

  return {
    workingFrame,
    vectors: [flattenedVector],
    originalWidth,
    originalHeight
  };
}
