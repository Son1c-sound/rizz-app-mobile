import { SuperwallOptions, LogLevel, LogScope } from '@superwall/react-native-superwall';

export const SUPERWALL_TRIGGERS = {
  ONBOARDING: 'campaign_trigger',
  FEATURE_UNLOCK: 'campaign_trigger',

} as const;

export const createSuperwallConfig = () => {
  const options = new SuperwallOptions();

  if (__DEV__) {
    options.logging.level = LogLevel.Debug;
    options.logging.scopes = [
      LogScope.PaywallPresentation,
      LogScope.PaywallTransactions,
      LogScope.Network,
    ];
  }

  

  return options;
}; 