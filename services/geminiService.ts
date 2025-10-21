
import { GoogleGenAI } from "@google/genai";
import type { FormState, CharacterResult } from '../types';

if (!process.env.API_KEY) {
    // This is a placeholder check. The actual key is injected by the environment.
    console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function buildTextPrompt(formState: FormState): string {
    return `
    Por favor, crea un concepto de personaje animado detallado basado en las siguientes ideas. El personaje debe ser un ícono de la solidaridad.

    **Tipo de Personaje:** ${formState.characterType}
    **Valores y Rasgos Clave:** ${formState.keyTraits}
    **Estilo de Arte Deseado:** ${formState.artStyle}

    Genera una respuesta estructurada con los siguientes encabezados en español. Sé creativo, inspirador y positivo.

    **Nombre del Personaje:**
    [Un nombre único y memorable que refleje su propósito.]

    **Apariencia:**
    [Una descripción visual muy detallada y vívida, perfecta para ser usada como prompt para un modelo de generación de imágenes. Describe su forma, colores, ropa (si aplica), expresiones y cualquier símbolo que lleve.]

    **Personalidad y Valores:**
    [Describe su carácter. ¿Cómo actúa? ¿Qué le motiva? Explora cómo encarna los valores de solidaridad, activismo y amor.]

    **Pequeña Historia de Origen:**
    [Una breve historia que explique cómo se convirtió en un símbolo de ayuda y solidaridad. Debe ser conmovedora y apta para todos los públicos.]
    `;
}

function extractAppearance(fullDescription: string): string {
    const match = fullDescription.match(/\*\*Apariencia:\*\*\s*([\s\S]*?)\s*(?=\*\*|$)/);
    return match ? match[1].trim() : 'a friendly animated character';
}

export const generateCharacter = async (formState: FormState): Promise<CharacterResult> => {
    try {
        // Step 1: Generate the character description
        const textPrompt = buildTextPrompt(formState);
        const textResponse = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: textPrompt
        });
        
        const characterDescription = textResponse.text;
        if (!characterDescription) {
            throw new Error("Failed to generate character description.");
        }

        // Step 2: Generate the character image based on the description
        const appearancePrompt = extractAppearance(characterDescription);
        const imagePrompt = `${appearancePrompt}, ${formState.artStyle} style, animated character, vibrant colors, friendly, for all ages, centered, solid background`;
        
        const imageResponse = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt,
            config: {
                numberOfImages: 1,
                aspectRatio: '1:1'
            }
        });
        
        const base64Image = imageResponse.generatedImages[0]?.image?.imageBytes;
        if (!base64Image) {
            throw new Error("Failed to generate character image.");
        }
        
        const imageUrl = `data:image/png;base64,${base64Image}`;

        return {
            description: characterDescription,
            imageUrl: imageUrl,
        };

    } catch (error) {
        console.error("Error in Gemini service:", error);
        if (error instanceof Error && error.message.includes('API key not valid')) {
             throw new Error("The API key is invalid. Please check your configuration.");
        }
        throw new Error("Could not generate character due to an API error.");
    }
};
