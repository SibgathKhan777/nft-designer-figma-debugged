import OpenAI from 'openai';

let openai: OpenAI | null = null;

function getOpenAI(): OpenAI | null {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openai;
}

export interface EnhancedMetadata {
  name: string;
  description: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  collection?: string;
  background_color?: string;
  animation_url?: string;
}

export async function generateEnhancedMetadata(
  originalMetadata: any,
  artName: string,
  width: number,
  height: number
): Promise<EnhancedMetadata> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.log('⚠️ OpenAI API key not found, using original metadata');
      return {
        name: originalMetadata.name,
        description: originalMetadata.description,
        attributes: originalMetadata.attributes || [],
        collection: originalMetadata.collection
      };
    }

    const prompt = `
You are an expert NFT metadata generator. Based on the following information, create enhanced metadata for an NFT:

Original Name: ${originalMetadata.name}
Original Description: ${originalMetadata.description}
Art Name: ${artName}
Dimensions: ${width}x${height}px
Original Attributes: ${JSON.stringify(originalMetadata.attributes || [])}
Collection: ${originalMetadata.collection || 'Unknown'}

Please generate:
1. An enhanced name (keep it creative but relevant)
2. A detailed, engaging description (2-3 sentences)
3. Additional relevant attributes based on the art (style, colors, mood, etc.)
4. A background color (hex code)
5. A collection name if not provided

Return the response as a JSON object with this exact structure:
{
  "name": "Enhanced Name",
  "description": "Enhanced description...",
  "attributes": [
    {"trait_type": "Style", "value": "Abstract"},
    {"trait_type": "Color", "value": "Blue"},
    {"trait_type": "Mood", "value": "Calm"}
  ],
  "collection": "Collection Name",
  "background_color": "#1a1a1a"
}
`;

    const openaiClient = getOpenAI();
    if (!openaiClient) {
      throw new Error('OpenAI client not initialized');
    }

    const completion = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert NFT metadata generator. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const enhancedMetadata = JSON.parse(response);
    
    // Merge with original attributes
    const allAttributes = [
      ...(originalMetadata.attributes || []),
      ...(enhancedMetadata.attributes || [])
    ];

    return {
      name: enhancedMetadata.name || originalMetadata.name,
      description: enhancedMetadata.description || originalMetadata.description,
      attributes: allAttributes,
      collection: enhancedMetadata.collection || originalMetadata.collection,
      background_color: enhancedMetadata.background_color || '#1a1a1a'
    };

  } catch (error) {
    console.error('Error generating enhanced metadata:', error);
    
    // Fallback to original metadata
    return {
      name: originalMetadata.name,
      description: originalMetadata.description,
      attributes: originalMetadata.attributes || [],
      collection: originalMetadata.collection,
      background_color: '#1a1a1a'
    };
  }
}
