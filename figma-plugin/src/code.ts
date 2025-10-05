// This file runs in the Figma plugin sandbox
figma.showUI(__html__, { width: 400, height: 600 });

let selectedFrame: any = null;

// Handle messages from the UI
figma.ui.onmessage = async (msg: any) => {
  console.log('Plugin received message:', msg);

  try {
    switch (msg.type) {
      case 'select-frame':
        await handleFrameSelection();
        break;
        
      case 'generate-description':
        await handleGenerateDescription(msg.title);
        break;
        
      case 'mint-nft':
        await handleMintNFT(msg.data);
        break;
        
      case 'close-plugin':
        figma.closePlugin();
        break;
        
      default:
        console.log('Unknown message type:', msg.type);
    }
  } catch (error: any) {
    console.error('Plugin error:', error);
    figma.ui.postMessage({
      type: 'error',
      message: error.message || 'An unexpected error occurred'
    });
  }
};

// Handle frame selection
async function handleFrameSelection() {
  try {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Please select a frame, component, or group first'
      });
      return;
    }

    // Use the first selected item
    const node = selection[0];
    
    if (node.type !== 'FRAME' && node.type !== 'COMPONENT' && node.type !== 'GROUP') {
      figma.ui.postMessage({
        type: 'error',
        message: 'Please select a frame, component, or group'
      });
      return;
    }

    // Export as PNG for thumbnail
    const pngBytes = await node.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 2 }
    });

    // Export as SVG for high-quality version
    const svgBytes = await node.exportAsync({
      format: 'SVG'
    });

    // Create thumbnail data URL
    const thumbnailDataUrl = `data:image/png;base64,${figma.base64Encode(pngBytes)}`;

    selectedFrame = {
      id: node.id,
      name: node.name,
      type: node.type,
      width: node.width,
      height: node.height,
      pngData: Array.from(pngBytes),
      svgData: Array.from(svgBytes),
      thumbnail: thumbnailDataUrl
    };

    figma.ui.postMessage({
      type: 'frame-selected',
      data: selectedFrame
    });

    console.log('Frame selected successfully:', node.name);

  } catch (error: any) {
    figma.ui.postMessage({
      type: 'error',
      message: `Frame selection failed: ${error.message}`
    });
  }
}

// Handle AI description generation
async function handleGenerateDescription(title: string) {
  try {
    console.log('Generating AI description for:', title);
    
    // Simulate AI generation (replace with actual AI service call)
    const descriptions = [
      `A stunning digital artwork featuring ${title.toLowerCase()}. This unique piece combines modern design principles with creative expression, perfect for NFT collectors who appreciate innovative digital art.`,
      `An exceptional creation titled "${title}". This NFT represents the fusion of artistic vision and digital craftsmanship, making it a valuable addition to any collection.`,
      `"${title}" - A remarkable digital masterpiece that showcases creativity and innovation. This NFT captures the essence of modern digital art and is ready for the blockchain.`
    ];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    figma.ui.postMessage({
      type: 'description-generated',
      data: randomDescription
    });

  } catch (error: any) {
    figma.ui.postMessage({
      type: 'error',
      message: `AI generation failed: ${error.message}`
    });
  }
}

// Handle NFT minting
async function handleMintNFT(mintData: any) {
  try {
    console.log('Starting NFT minting process:', mintData);
    
    if (!selectedFrame) {
      figma.ui.postMessage({
        type: 'mint-error',
        message: 'No frame selected. Please select a frame first.'
      });
      return;
    }

    // Prepare the minting data
    const nftData = {
      title: mintData.title,
      description: mintData.description,
      network: mintData.network,
      wallet: mintData.wallet,
      frame: {
        id: selectedFrame.id,
        name: selectedFrame.name,
        type: selectedFrame.type,
        width: selectedFrame.width,
        height: selectedFrame.height,
        pngData: selectedFrame.pngData,
        svgData: selectedFrame.svgData
      }
    };

    console.log('Sending minting data to backend...');
    
    // Send to backend for processing
    console.log('Sending request to backend:', 'http://localhost:3001/api/mint-nft');
    
    const response = await fetch('http://localhost:3001/api/mint-nft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nftData)
    });

    console.log('Backend response status:', response.status);
    console.log('Backend response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error response:', errorText);
      throw new Error(`Backend error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    console.log('Backend response data:', result);
    
    if (result.success) {
      figma.ui.postMessage({
        type: 'mint-success',
        data: result.data
      });
      
      console.log('NFT minted successfully:', result.data);
    } else {
      figma.ui.postMessage({
        type: 'mint-error',
        message: result.message || 'Minting failed'
      });
    }

  } catch (error: any) {
    console.error('Minting error:', error);
    figma.ui.postMessage({
      type: 'mint-error',
      message: `Minting failed: ${error.message}`
    });
  }
}
