'use client';

import { useState } from 'react';
import type { TabsProps } from './types';
import Tab from '../../atoms/Tab';
import Box from './../../atoms/Box';
import { combineClassNames } from '@monkey-tilt/utils';
import { TABS_BASE_STYLES, TABS_VARIANT_STYLES, TABS_COLOR_MAP } from './constants';

const Tabs: React.FC<TabsProps> = ({
  data,
  activeTab: initialActiveTab,
  onTabChange,
  className = '',
  variant = 'default',
  color = 'primary',
  fullWidth = false,
}) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab || data?.[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const getListItemStyles = (itemId: string) => {
    if (variant !== 'underline') return fullWidth ? 'flex-1' : 'me-2';

    const baseStyles = fullWidth ? 'flex-1' : 'me-2';
    const activeStyles = activeTab === itemId ? TABS_COLOR_MAP[color] : '';
    return combineClassNames(baseStyles, activeStyles);
  };

  return (
    <Box className={className} fullWidth={fullWidth}>
      <Box
        variant="ul"
        fullWidth={fullWidth}
        className={combineClassNames(TABS_BASE_STYLES, TABS_VARIANT_STYLES[variant])}
      >
        {data?.map(item => (
          <li key={item.id} className={getListItemStyles(item.id)}>
            <Tab
              id={item.id}
              label={item.label}
              isActive={activeTab === item.id}
              isDisabled={!!item.disabled}
              icon={item.icon}
              onClick={handleTabClick}
              variant={variant}
              color={color}
              fullWidth={fullWidth}
            />
          </li>
        ))}
      </Box>
      <Box mt="mt-4">
        {data?.map(item => (
          <Box
            key={item.id}
            className={activeTab === item.id ? 'block' : 'hidden'}
            role="tabpanel"
            aria-labelledby={`${item.id}-tab`}
          >
            {item.content}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Tabs;
