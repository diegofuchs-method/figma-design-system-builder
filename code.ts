/**
 * Main plugin code - Handles routing between different builders
 */

import { createIconSet, processBatch } from './iconSet';
import { createIconSingle, processBatchSingle } from './iconSingle';
import __html__ from './ui.html';

// Listen for messages from the UI
figma.ui.onmessage = async (msg: any) => {
  if (msg.type === 'create-icon-set') {
    try {
      const mode = msg.mode || 'single';

      // Check if something is selected
      if (figma.currentPage.selection.length === 0) {
        figma.ui.postMessage({
          type: 'error',
          message: 'Please select a frame first'
        });
        return;
      }

      // Single mode requires exactly one frame
      if (mode === 'single' && figma.currentPage.selection.length > 1) {
        figma.ui.postMessage({
          type: 'error',
          message: 'Single mode supports only one frame. Please select one frame or switch to Batch mode for multiple frames.'
        });
        return;
      }

      if (mode === 'single') {
        // Single mode: use provided icon name
        const iconName = msg.iconName;
        const selectedNode = figma.currentPage.selection[0];

        // Check if selection is a valid node type that can be cloned
        if (!('clone' in selectedNode)) {
          figma.ui.postMessage({
            type: 'error',
            message: 'Please select a valid vector or group object'
          });
          return;
        }

        await createIconSet(selectedNode, iconName);
        figma.ui.postMessage({
          type: 'success',
          message: 'Icon set created successfully!'
        });
      } else if (mode === 'batch') {
        // Batch mode: use frame names as icon names
        const selectedNodes = figma.currentPage.selection;

        // Process frames
        const results = await processBatch(selectedNodes);

        // Send message (error or success)
        figma.ui.postMessage({
          type: results.isError ? 'error' : 'success',
          message: results.message
        });
      }
    } catch (error) {
      figma.ui.postMessage({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to create icon set'
      });
    }
  }

  if (msg.type === 'create-icon-single') {
    try {
      const mode = msg.mode || 'single';

      // Check if something is selected
      if (figma.currentPage.selection.length === 0) {
        figma.ui.postMessage({
          type: 'error',
          message: 'Please select a frame first'
        });
        return;
      }

      // Single mode requires exactly one frame
      if (mode === 'single' && figma.currentPage.selection.length > 1) {
        figma.ui.postMessage({
          type: 'error',
          message: 'Please select one frame only'
        });
        return;
      }

      if (mode === 'single') {
        const iconName = msg.iconName;
        const selectedNode = figma.currentPage.selection[0];

        // Check if selection is a valid node type that can be cloned
        if (!('clone' in selectedNode)) {
          figma.ui.postMessage({
            type: 'error',
            message: 'Please select a valid vector or group object'
          });
          return;
        }

        await createIconSingle(selectedNode, iconName);
        figma.ui.postMessage({
          type: 'success',
          message: 'Icon component created successfully!'
        });
      } else if (mode === 'batch') {
        // Batch mode: use frame names as icon names
        const selectedNodes = figma.currentPage.selection;

        // Process frames
        const results = await processBatchSingle(selectedNodes);

        // Send message (error or success)
        figma.ui.postMessage({
          type: results.isError ? 'error' : 'success',
          message: results.message
        });
      }
    } catch (error) {
      figma.ui.postMessage({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to create icon component'
      });
    }
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
};

// Listen for selection changes to clear error messages
figma.on('selectionchange', () => {
  figma.ui.postMessage({
    type: 'selectionchange',
    count: figma.currentPage.selection.length
  });
});

// Show the UI
figma.showUI(__html__, { width: 400, height: 600 });
