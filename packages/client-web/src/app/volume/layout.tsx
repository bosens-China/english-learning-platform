import React from 'react';
import { Theme } from './theme';

export default function VolumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Theme>{children}</Theme>;
}
