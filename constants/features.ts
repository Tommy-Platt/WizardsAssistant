import { icons } from './icons';

// Defines the features available in the app. Info can be passed to the FeatureContext and can be displayed by mapping over the array.
export const FEATURES = [
    { id: 'spells', name: 'D&D Spells', route: '/(dnd)/spells', description: 'Search all D&D 5E (base game) spells!', icon: icons.spells },
    { id: 'items', name: 'D&D Items', route: '/(dnd)/items', description: 'Search all D&D 5E (+ extra) magic items!', icon: icons.items },
    { id: 'session', name: 'D&D Session Summaries', route: '/(dnd)/session', description: 'Document your latest campaign session.', icon: icons.session },
    { id: 'dice', name: 'D&D Dice Roller', route: '/(dnd)/dice', description: 'Custom options for dice rolling.', icon: icons.dice },
    { id: 'cards', name: 'MTG Cards', route: '/(mtg)/cards', description: 'Search all MTG cards!', icon: icons.mtgCards },
    { id: 'health', name: 'MTG Health Tracker', route: '/(mtg)/health', description: 'Track HP for MTG. Up to 4 players.', icon: icons.mtgHealth },
];