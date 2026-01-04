
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStylingAdvice = async (product: Product): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a high-end Zara fashion stylist. Provide 3 specific styling tips for a product named "${product.name}" in category "${product.category}". The product is described as: "${product.description}". Keep the tone professional, editorial, and minimalist. Focus on "The Total Look".`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    // The GenerateContentResponse object features a text property (not a method)
    return response.text || "Pair this with minimalist accessories for an effortless look.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Style this with neutral tones and clean silhouettes for a timeless aesthetic.";
  }
};

export const getTrendingOutfits = async (products: Product[]): Promise<string[]> => {
  try {
    const productList = products.map(p => p.name).join(", ");
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on these products: ${productList}, suggest 2 trending outfit combinations in the style of a Zara editorial. Keep suggestions brief and sophisticated.`,
      config: {
        temperature: 1,
      }
    });

    // Use response.text directly
    return (response.text || "").split('\n').filter(line => line.length > 10);
  } catch (error) {
    return ["Monochrome layering with linen and leather.", "Urban oversized silhouettes with chunky footwear."];
  }
};
