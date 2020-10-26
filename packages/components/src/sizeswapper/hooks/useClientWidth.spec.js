import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useClientWidth } from './useClientWidth';

describe('useClientWidth', () => {
  describe('when invalid ref is provided', () => {
    it('returns 0', () => {
      const elRef = { invalid: true };
      const {
        result: { current },
      } = renderHook(() => useClientWidth({ elRef }));

      expect(current).toEqual([null]);
    });
  });

  describe('when valid ref is provided', () => {
    it('returns initial ref width', () => {
      const elRef = { current: { clientWidth: 500 } };
      const {
        result: { current },
      } = renderHook(() => useClientWidth({ elRef }));

      expect(current).toEqual([500]);
    });

    it('updates the ref width on window resize', () => {
      const elRef = { current: { clientWidth: 500 } };
      const { result } = renderHook(() => useClientWidth({ elRef }));

      expect(result.current).toEqual([500]);

      act(() => {
        elRef.current.clientWidth = 700;
        fireEvent(window, new Event('resize'));
      });

      expect(result.current).toEqual([700]);
    });
  });
});
