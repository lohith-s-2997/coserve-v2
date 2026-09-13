import React from 'react';
import { ServicesDiscoveryView } from './ServicesDiscoveryView';

/**
 * Legacy alias redirecting to the new, hardened ServicesDiscoveryView
 */
export const FindServicesView: React.FC = () => {
  return <ServicesDiscoveryView />;
};

export default FindServicesView;
