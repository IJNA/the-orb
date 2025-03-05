import { toast } from "react-toastify";
import { isMobile } from "./DeviceDetection";

export interface ShareData {
    passage: string;
    text: string;
    url: string;
}

export const shareContent = async ({ passage, text, url }: ShareData) => {
    // Format with quoted text, two line breaks, then URL
    const formattedContent = `"${text}"\n\n${url}`;

    try {
        // On mobile, use native share sheet
        if (isMobile && navigator.share) {
            try {
                await navigator.share({
                    title: passage,
                    text: formattedContent,
                });
                return;
            } catch (err) {
                if (err instanceof Error && err.name === "AbortError") {
                    return; // User cancelled sharing
                }
                console.error("Native share failed, falling back to clipboard");
            }
        }

        // Clipboard fallback for desktop or if native sharing fails
        await navigator.clipboard.writeText(formattedContent);
        toast.success("Passage copied to clipboard!");
    } catch (err) {
        console.error("Error sharing:", err);
        toast.error("Failed to share or copy passage");
    }
};
