/**
 * The default container setting, determining whether width calculations are
 * based on the element itself ("self") or its parent container ("parent").
 */
export const DefaultContainer = "parent";

/**
 * The default minimum font size scaling width, which sets the lower bound for
 * scaling font sizes based on element or container width.
 */
export const DefaultFontSizeMinWidth = 1.0;

/**
 * The default maximum font size scaling width, which sets the upper bound for
 * scaling font sizes based on element or container width.
 */
export const DefaultFontSizeMaxWidth = 1.8;

/**
 * The default unit for font size calculations. Options include "em", "pt",
 * "px", and "rem". The default is "em".
 */
export const DefaultFontSizeUnits = "em";

/**
 * The default minimum line height scaling width, which sets the lower bound
 * for scaling line heights based on element or container width.
 */
export const DefaultLineHeightMinWidth = 1.33;

/**
 * The default maximum line height scaling width, which sets the upper bound
 * for scaling line heights based on element or container width.
 */
export const DefaultLineHeightMaxWidth = 1.25;

/**
 * The default minimum width of the element or container for scaling
 * calculations, typically the smallest screen width supported.
 */
export const DefaultMinWidth = 320;

/**
 * The default maximum width of the element or container for scaling
 * calculations, typically the largest screen width supported.
 */
export const DefaultMaxWidth = 960;

/**
 * Configuration options for the Textblock application. These options allow
 * customization of behaviors like debouncing recalculations and enabling
 * debugging.
 */
export interface TextblockOptions {
	/**
	 * The debounce delay, in milliseconds, for recalculating typography
	 * adjustments. If provided, it controls how frequently the recalculations
	 * are triggered when window resizing or similar events occur.
	 */
	debounce?: number;

	/**
	 * A flag to enable or disable debug logging. When set to true, debug
	 * messages will be logged to the console, helping with troubleshooting and
	 * understanding the behavior of the Textblock logic.
	 */
	debug?: boolean;
}

/**
 * Represents an element that will be targeted for dynamic typography
 * adjustments. Defines the configuration for font size, line height, and
 * optional variable grade scaling based on the width of the element or its
 * container.
 */
export interface TextblockTarget {
	/**
	 * Specifies whether the width calculations should be based on the element
	 * itself ("self") or its parent container ("parent"). Default is "parent".
	 */
	container?: "parent" | "self";

	/**
	 * The minimum width at which the font size scaling starts.
	 */
	fontSizeMinWidth?: number;

	/**
	 * The maximum width at which the font size scaling ends.
	 */
	fontSizeMaxWidth?: number;

	/**
	 * The units to use for font size. Default is "px".
	 */
	fontSizeUnits?: "em" | "pt" | "px" | "rem";

	/**
	 * The minimum width at which the line height scaling starts.
	 */
	lineHeightMinWidth?: number;

	/**
	 * The maximum width at which the line height scaling ends.
	 */
	lineHeightMaxWidth?: number;

	/**
	 * The minimum width of the element or container for scaling calculations.
	 */
	minWidth?: number;

	/**
	 * The maximum width of the element or container for scaling calculations.
	 */
	maxWidth?: number;

	/**
	 * The CSS selector string used to target specific HTML elements.
	 */
	target: string;

	/**
	 * The maximum width at which variable grade scaling should be applied, if
	 * applicable.
	 */
	variableGradeMaxWidth?: number;

	/**
	 * The minimum width at which variable grade scaling should be applied, if
	 * applicable.
	 */
	variableGradeMinWidth?: number;
}

/**
 * The entry point for initializing the Textblock application. This function
 * applies the provided text block configurations and options to the target
 * elements, adjusting their typography dynamically.
 *
 * @param {TextblockTarget[]} blocks - An array of TextblockTarget objects,
 * each representing a configuration for selecting and styling HTML elements.
 *
 * @param {TextblockOptions} [options] - Optional settings that modify the
 * behavior of the Textblock application, such as global overrides or
 * additional configurations.
 */
export const Textblock = (blocks: TextblockTarget[], options?: TextblockOptions) => {
	console.log(`[TB] Textblock v${TB_VERSION || "🤔"}`);

	if (typeof window === "undefined" || typeof document === "undefined") {
		console.error(
			"[TB] A valid DOM is required. If you're using SSR, be sure to initialize Textblock on the client."
		);
		return null;
	}

	const { debounce = 200, debug = false } = options || ({} as TextblockOptions);
	const cancelHandles = onDocumentReady(() => {
		onLoad(blocks);
		return onResize(debounceCallback(() => onLoad(blocks), debounce));
	});

	return () => {
		if (typeof cancelHandles === "function") {
			cancelHandles();
		}
	};

	/**
	 * Executes a callback function once the document is fully loaded. If the
	 * document is already ready, the callback is executed immediately. Otherwise,
	 * the callback is executed after the window's "load" event.
	 *
	 * @param {() => void} callback - The callback function to execute when the
	 * document is ready.
	 *
	 * @returns {() => void} - A function to remove the "load" event listener, if
	 * it was added.
	 */
	function onDocumentReady(callback: () => void) {
		if (document.readyState === "complete") {
			callback();
		} else {
			window.addEventListener("load", () => callback());
		}

		return () => window.removeEventListener("load", callback);
	}

	/**
	 * Loops through all the provided text blocks and applies typography changes
	 * to matching HTML elements based on the blocks' target selectors. This is
	 * typically used when the page loads to initialize typography settings.
	 *
	 * @param {TextblockTarget[]} blocks - An array of TextblockTarget objects,
	 * each representing a configuration for selecting and styling HTML elements.
	 */
	function onLoad(blocks: TextblockTarget[]) {
		if (blocks.length === 0) {
			debug && console.debug("[TB] No blocks were provided. Are you sure your configuration is correct?");
			return;
		}

		blocks.forEach((b) => {
			const elements = Array.from(document.querySelectorAll(b.target)).filter(
				(el): el is HTMLElement => el instanceof HTMLElement
			);

			debug && console.debug(`[TB] Found ${elements.length} elements matching the ${b.target} selector.`);

			elements.forEach((e) => {
				const measures = calculateTypographyMeasurements(b, e);
				if (measures) {
					e.style.fontSize = `${measures.fontSize}${b.fontSizeUnits}`;
					e.style.lineHeight = `${measures.lineHeight}`;
					measures.fontVariationSettings && (e.style.fontVariationSettings = measures.fontVariationSettings);
				}
			});
		});
	}

	/**
	 * Attaches a resize event listener to the window that triggers the provided
	 * callback function when the window is resized. The callback runs the
	 * recalculations for the provided text blocks.
	 *
	 * @param {(blocks: TextblockTarget[]) => void} callback - The callback
	 * function to be executed when the window resize event occurs. It receives
	 * an array of TextblockTarget objects.
	 *
	 * @returns {() => void} - A function that removes the resize event listener
	 * when called.
	 */
	function onResize(callback: (blocks: TextblockTarget[]) => void) {
		if (blocks.length === 0) {
			debug && console.debug("[TB] No blocks were provided. Are you sure your configuration is correct?");
			return;
		}

		window.addEventListener("resize", () => callback(blocks), true);

		return () => window.removeEventListener("resize", () => callback(blocks));
	}

	/**
	 * Calculates the width of an HTML element, excluding its padding and border
	 * widths. If the element is invalid or not provided, returns 0.
	 *
	 * @param {HTMLElement|ParentNode|null} [element] - The HTML element or parent
	 * node whose width is being calculated. If not provided or invalid, the
	 * function returns 0.
	 *
	 * @returns {number} - The calculated width of the element, excluding padding
	 * and border widths. Returns 0 if the element is invalid.
	 */
	function calculateElementWidth(element?: HTMLElement | ParentNode | null) {
		if (!element) return 0;

		const node = element as HTMLElement;
		let width = 0;
		try {
			const paddingWidth =
				parseInt(computeElementStyle(node, "padding-left")) +
				parseInt(computeElementStyle(node, "padding-right"));

			const borderWidth =
				parseInt(computeElementStyle(node, "border-left-width")) +
				parseInt(computeElementStyle(node, "border-right-width"));

			width = node.offsetWidth - paddingWidth - borderWidth;
		} catch {
			debug && console.debug(`[TB] Node ${node.id} wasn't a valid HTML element. Assuming zero width.`);
		}

		return width;
	}

	/**
	 * Calculates and returns an object with the computed font size, line height,
	 * and optional font variation settings for a given element based on the
	 * element's width and the specified target block settings.
	 *
	 * @param {TextblockTarget} block - The target object containing width ranges
	 * and typography settings used to calculate font size and line height.
	 *
	 * @param {Element} [element] - The HTML element whose typography measurements
	 * are being calculated. If omitted or not an HTMLElement, the function
	 * returns undefined.
	 *
	 * @returns {object|undefined} - An object containing the calculated fontSize,
	 * lineHeight, and fontVariationSettings for the element, or undefined if the
	 * element is invalid.
	 *
	 * @returns {number} [return.fontSize] - The calculated font size based on the
	 * element's width and block settings.
	 *
	 * @returns {number} [return.lineHeight] - The calculated line height based on
	 * the element's width and block settings.
	 *
	 * @returns {string|undefined} [return.fontVariationSettings] - The optional
	 * font variation settings (e.g., "wght" grade) if applicable, or undefined.
	 */
	function calculateTypographyMeasurements(block: TextblockTarget, element?: Element) {
		if (!element || !(element instanceof HTMLElement)) return undefined;

		const {
			container = DefaultContainer,
			fontSizeMaxWidth: fontMaxWidth = DefaultFontSizeMaxWidth,
			fontSizeMinWidth: fontMinWidth = DefaultFontSizeMinWidth,
			lineHeightMaxWidth: lineMaxWidth = DefaultLineHeightMaxWidth,
			lineHeightMinWidth: lineMinWidth = DefaultLineHeightMinWidth,
			maxWidth = DefaultMaxWidth,
			minWidth = DefaultMinWidth,
			variableGradeMaxWidth: vgMax,
			variableGradeMinWidth: vgMin
		} = block;

		const width = container === "self" ? calculateElementWidth(element) : calculateElementWidth(element.parentNode);
		const capped = Math.min(Math.max(width, minWidth), maxWidth); // caps container width to minWidth x maxWidth
		const widthRatio = (capped - minWidth) / (maxWidth - minWidth);
		const grade = vgMax && vgMin ? scaleInRange(vgMin, vgMax, widthRatio) : undefined;

		return {
			fontSize: scaleInRange(fontMinWidth, fontMaxWidth, widthRatio),
			lineHeight: scaleInRange(lineMinWidth, lineMaxWidth, widthRatio),
			fontVariationSettings: grade ? `"wght" ${grade}` : undefined
		};
	}

	/**
	 * Retrieves the computed style value of a specified CSS property for a given
	 * HTML element. For example, this can be used to get the final calculated
	 * width or padding in pixels.
	 *
	 * @param {HTMLElement} element - The HTML element whose style is being
	 * computed.
	 *
	 * @param {string} style - The name of the CSS property to retrieve the
	 * computed value for.
	 *
	 * @returns {string} - The computed style value for the specified property.
	 */
	function computeElementStyle(element: HTMLElement, style: string) {
		return window.getComputedStyle(element, null).getPropertyValue(style);
	}

	/**
	 * Debounces a callback function to delay its execution and improve
	 * performance. The callback is executed after the specified delay,
	 * and any repeated calls within the delay period will reset the timer.
	 *
	 * @param {(blocks: TextblockTarget[]) => void} callback - The callback
	 * function to be debounced. It receives an array of TextblockTarget objects.
	 *
	 * @param {number} delay - The delay in milliseconds after which the callback
	 * will be executed.
	 *
	 * @returns {(blocks: TextblockTarget[]) => void} - A debounced function that
	 * delays the execution of the callback.
	 */
	function debounceCallback(callback: (blocks: TextblockTarget[]) => void, delay: number) {
		let timeoutId: number | null;
		return (blocks: TextblockTarget[]) => {
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = window.setTimeout(() => {
				callback(blocks);
			}, delay);
		};
	}

	/**
	 * Calculates a scale within the specified range.
	 *
	 * @param {number} min - The minimum value of the range.
	 *
	 * @param {number} max - The maximum value of the range.
	 *
	 * @param {number} factor - A scaling factor between 0 and 1 that determines
	 * the proportion of the range.
	 *
	 * @returns {number} - The calculated scale within the range [min, max].
	 */
	function scaleInRange(min: number, max: number, factor: number) {
		return min + (max - min) * factor;
	}
};
