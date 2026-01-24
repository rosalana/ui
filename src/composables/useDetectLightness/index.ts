import { type Ref, ref, watch, onMounted, nextTick } from "vue";

/**
 * Zjistí, zda je obrázek světlý nebo tmavý
 */
export function useDetectLightness(
    imgEl: Ref<HTMLElement | null>,
    watchSource?: Ref<unknown>
) {
    const isLight = ref<boolean>(true);

    const process = async (): Promise<void> => {
        await nextTick();
        if (!imgEl.value) return;
        const src = extractImageSource(imgEl.value);
        if (!src) return;

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src;
        img.onload = () => {
            isLight.value = computeLightness(img);
        };
    };

    onMounted(process);
    watch(imgEl, process);
    if (watchSource) {
        watch(watchSource, process); // navíc sleduj třeba currentImageIndex
    }

    return { isLight, process };
}

/**
 * Zjistí URL obrázku z <img> nebo z background-image
 */
function extractImageSource(el: HTMLElement): string | null {
    if (el instanceof HTMLImageElement) {
        return el.getAttribute("src");
    }

    const style: CSSStyleDeclaration = getComputedStyle(el);
    const bg: string = style.backgroundImage;
    if (!bg || bg === "none") return null;

    return bg.slice(4, -1).replace(/['"]/g, "");
}

/**
 * Spočítá průměrnou světlost obrázku a vrátí true, pokud je světlý
 */
function computeLightness(img: HTMLImageElement): boolean {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return true;

    // downscale kvůli výkonu
    canvas.width = 20;
    canvas.height = 20;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const data: Uint8ClampedArray = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    ).data;
    let r = 0,
        g = 0,
        b = 0;

    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }

    const pixels = data.length / 4;
    const avgR = r / pixels;
    const avgG = g / pixels;
    const avgB = b / pixels;

    const luminance: number = 0.299 * avgR + 0.587 * avgG + 0.114 * avgB;
    return luminance > 128; // světlý → true, tmavý → false
}
