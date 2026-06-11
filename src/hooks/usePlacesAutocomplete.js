// hooks/usePlacesAutocomplete.js
// ─────────────────────────────────────────────────────────────────────────────
// Drop this file inside  src/hooks/usePlacesAutocomplete.js
//
// Usage in HeroSection (or any component):
//   const pickupRef = useRef(null);
//   const dropRef   = useRef(null);
//   usePlacesAutocomplete(pickupRef, (val) => setFormData(p => ({ ...p, pickupAddress: val })));
//   usePlacesAutocomplete(dropRef,   (val) => setFormData(p => ({ ...p, dropAddress:   val })));
//   <input ref={pickupRef} name="pickupAddress" ... />
//   <input ref={dropRef}   name="dropAddress"   ... />
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react';

/**
 * Attaches Google Places Autocomplete to an <input> ref.
 *
 * @param {React.RefObject<HTMLInputElement>} inputRef  - ref attached to the <input>
 * @param {(value: string) => void}           onChange  - called whenever user picks a suggestion
 * @param {object}                            [options] - optional google.maps.places.AutocompleteOptions
 */
export default function usePlacesAutocomplete(inputRef, onChange, options = {}) {
  const autocompleteRef = useRef(null);

  useEffect(() => {
    // Wait until Google Maps + Places library is ready
    const init = () => {
      if (!inputRef.current) return;
      if (!window.google?.maps?.places) return;

      // Default: bias toward India, prefer cities + establishments
      const defaultOptions = {
        componentRestrictions: { country: 'in' },
        fields: ['formatted_address', 'geometry', 'name'],
        types: ['geocode', 'establishment'],
        ...options,
      };

      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        defaultOptions
      );

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        // Prefer formatted_address; fall back to name
        const value = place.formatted_address || place.name || '';
        onChange(value);
        // Also update the native input value so formData stays in sync
        if (inputRef.current) inputRef.current.value = value;
      });
    };

    // If Maps already loaded → init immediately
    if (window.google?.maps?.places) {
      init();
    } else {
      // Otherwise poll until ready (App.jsx loads the script asynchronously)
      const timer = setInterval(() => {
        if (window.google?.maps?.places) {
          clearInterval(timer);
          init();
        }
      }, 200);
      return () => clearInterval(timer);
    }

    // Cleanup: remove the widget DOM node Google injects
    return () => {
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
      // Remove the .pac-container dropdown Google appends to <body>
      document.querySelectorAll('.pac-container').forEach(el => el.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);          // run once on mount — inputRef & onChange won't change
}
