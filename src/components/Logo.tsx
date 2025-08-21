import React from 'react';
import Svg, { Circle, Polygon, Path, Text as SvgText } from 'react-native-svg';
import { View } from 'react-native';

export default function Logo({ size = 64 }: { size?: number }) {
  const w = size;
  const h = size;
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={w} height={h} viewBox="0 0 100 100">
        {/* Cat head */}
        <Circle cx="50" cy="48" r="22" fill="#000" />
        {/* Ears */}
        <Polygon points="35,28 45,20 45,36" fill="#000" />
        <Polygon points="65,28 55,20 55,36" fill="#000" />
        {/* Eyes */}
        <Circle cx="43" cy="48" r="3" fill="#fff" />
        <Circle cx="57" cy="48" r="3" fill="#fff" />
        {/* Nose */}
        <Circle cx="50" cy="54" r="2" fill="#fff" />
        {/* Tail (abstract arc) */}
        <Path d="M78 60 C90 48, 90 80, 78 70" strokeWidth="6" stroke="#000" fill="none" />
      </Svg>
      <Svg width={w} height={24} viewBox="0 0 100 24">
        <SvgText x="50" y="18" fontSize="18" fontWeight="bold" textAnchor="middle">TAKTIKKAT</SvgText>
      </Svg>
    </View>
  );
}
