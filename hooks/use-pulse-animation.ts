import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

interface UsePulseAnimationOptions {
  enabled?: boolean;
  minScale?: number;
  maxScale?: number;
  duration?: number;
}

export function usePulseAnimation(options: UsePulseAnimationOptions = {}) {
  const {
    enabled = true,
    minScale = 0.95,
    maxScale = 1.05,
    duration = 1200,
  } = options;

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!enabled) return;

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: maxScale,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: minScale,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();
    return () => pulse.stop();
  }, [enabled, minScale, maxScale, duration]);

  return pulseAnim;
}
