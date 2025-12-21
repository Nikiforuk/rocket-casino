import { GRADIENTS } from '../../../../../styles/gradients';
import animalCaseImg from '../../assets/images/animal-case.png';
import foodCaseImg from '../../assets/images/food-case.png';
import spaceCaseImg from '../../assets/images/space-case.png';
import sportsCaseImg from '../../assets/images/sports-case.png';
import type CasesItem from '../types/cases';

export const cases = [
  {
    id: 0,
    icon: animalCaseImg,
    name: 'Animal Case',
    casesType: 'animal',
    price: '$50',
  },
  {
    id: 1,
    icon: spaceCaseImg,
    name: 'Space Case',
    casesType: 'space',
    price: '$75',
  },
  {
    id: 2,
    icon: foodCaseImg,
    name: 'Food Case',
    casesType: 'food',
    price: '$40',
  },
  {
    id: 3,
    icon: sportsCaseImg,
    name: 'Sports Case',
    casesType: 'sports',
    price: '$60',
  },
];

export const emojis: CasesItem[] = [
  // animalCase
  { id: 1, emoji: '🐭', name: 'Mouse', rarity: 'common', caseType: 'animal', price: '$25' },
  { id: 2, emoji: '🐰', name: 'Rabbit', rarity: 'common', caseType: 'animal', price: '$25' },
  { id: 3, emoji: '🐸', name: 'Frog', rarity: 'common', caseType: 'animal', price: '$25' },
  { id: 4, emoji: '🐔', name: 'Chicken', rarity: 'common', caseType: 'animal', price: '$25' },
  { id: 5, emoji: '🐷', name: 'Pig', rarity: 'common', caseType: 'animal', price: '$25' },
  { id: 6, emoji: '🐼', name: 'Panda', rarity: 'uncommon', caseType: 'animal', price: '$50' },
  { id: 7, emoji: '🦊', name: 'Fox', rarity: 'uncommon', caseType: 'animal', price: '$50' },
  { id: 8, emoji: '🦝', name: 'Raccoon', rarity: 'uncommon', caseType: 'animal', price: '$50' },
  { id: 9, emoji: '🦁', name: 'Lion', rarity: 'rare', caseType: 'animal', price: '$80' },
  { id: 10, emoji: '🐯', name: 'Tiger', rarity: 'rare', caseType: 'animal', price: '$80' },
  { id: 11, emoji: '🦄', name: 'Unicorn', rarity: 'epic', caseType: 'animal', price: '$500' },
  { id: 12, emoji: '🐲', name: 'Dragon', rarity: 'epic', caseType: 'animal', price: '$500' },
  {
    id: 13,
    emoji: '🦖',
    name: 'Dinosaur',
    rarity: 'legendary',
    caseType: 'animal',
    price: '$1000',
  },
  { id: 14, emoji: '👑', name: 'Crown', rarity: 'gold', caseType: 'animal', price: '$1500' },

  // spaceCase
  { id: 15, emoji: '⭐', name: 'Star', rarity: 'common', caseType: 'space', price: '$38' },
  { id: 16, emoji: '🌙', name: 'Moon', rarity: 'common', caseType: 'space', price: '$38' },
  { id: 17, emoji: '☄️', name: 'Comet', rarity: 'common', caseType: 'space', price: '$38' },
  { id: 18, emoji: '🛸', name: 'UFO', rarity: 'common', caseType: 'space', price: '$38' },
  { id: 19, emoji: '🌍', name: 'Earth', rarity: 'common', caseType: 'space', price: '$38' },
  { id: 20, emoji: '🪐', name: 'Planet', rarity: 'uncommon', caseType: 'space', price: '$75' },
  { id: 21, emoji: '🌌', name: 'Galaxy', rarity: 'uncommon', caseType: 'space', price: '$75' },
  { id: 22, emoji: '🚀', name: 'Rocket', rarity: 'uncommon', caseType: 'space', price: '$75' },
  { id: 23, emoji: '👽', name: 'Alien', rarity: 'rare', caseType: 'space', price: '$120' },
  { id: 24, emoji: '🌟', name: 'Glow Star', rarity: 'rare', caseType: 'space', price: '$120' },
  { id: 25, emoji: '💫', name: 'Dizzy Star', rarity: 'epic', caseType: 'space', price: '$750' },
  { id: 26, emoji: '🌠', name: 'Shooting Star', rarity: 'epic', caseType: 'space', price: '$750' },
  {
    id: 27,
    emoji: '🔭',
    name: 'Telescope',
    rarity: 'legendary',
    caseType: 'space',
    price: '$1500',
  },
  { id: 28, emoji: '🌞', name: 'Sun', rarity: 'gold', caseType: 'space', price: '$2250' },

  // foodCase
  { id: 29, emoji: '🍎', name: 'Apple', rarity: 'common', caseType: 'food', price: '$20' },
  { id: 30, emoji: '🍌', name: 'Banana', rarity: 'common', caseType: 'food', price: '$20' },
  { id: 31, emoji: '🍞', name: 'Bread', rarity: 'common', caseType: 'food', price: '$20' },
  { id: 32, emoji: '🥕', name: 'Carrot', rarity: 'common', caseType: 'food', price: '$20' },
  { id: 33, emoji: '🥒', name: 'Cucumber', rarity: 'common', caseType: 'food', price: '$20' },
  { id: 34, emoji: '🍕', name: 'Pizza', rarity: 'uncommon', caseType: 'food', price: '$40' },
  { id: 35, emoji: '🍔', name: 'Burger', rarity: 'uncommon', caseType: 'food', price: '$40' },
  { id: 36, emoji: '🌮', name: 'Taco', rarity: 'uncommon', caseType: 'food', price: '$40' },
  { id: 37, emoji: '🍰', name: 'Cake', rarity: 'rare', caseType: 'food', price: '$64' },
  { id: 38, emoji: '🍣', name: 'Sushi', rarity: 'rare', caseType: 'food', price: '$64' },
  { id: 39, emoji: '🦞', name: 'Lobster', rarity: 'epic', caseType: 'food', price: '$400' },
  { id: 40, emoji: '🍾', name: 'Champagne', rarity: 'epic', caseType: 'food', price: '$400' },
  {
    id: 41,
    emoji: '🎂',
    name: 'Birthday Cake',
    rarity: 'legendary',
    caseType: 'food',
    price: '$800',
  },
  { id: 42, emoji: '💎', name: 'Diamond', rarity: 'gold', caseType: 'food', price: '$1200' },

  // sportsCase
  { id: 43, emoji: '⚽', name: 'Football', rarity: 'common', caseType: 'sports', price: '$30' },
  { id: 44, emoji: '🏀', name: 'Basketball', rarity: 'common', caseType: 'sports', price: '$30' },
  { id: 45, emoji: '🏈', name: 'Rugby Ball', rarity: 'common', caseType: 'sports', price: '$30' },
  { id: 46, emoji: '⚾', name: 'Baseball', rarity: 'common', caseType: 'sports', price: '$30' },
  { id: 47, emoji: '🎾', name: 'Tennis', rarity: 'common', caseType: 'sports', price: '$30' },

  { id: 48, emoji: '🏐', name: 'Volleyball', rarity: 'uncommon', caseType: 'sports', price: '$60' },
  { id: 49, emoji: '🏓', name: 'Ping Pong', rarity: 'uncommon', caseType: 'sports', price: '$60' },
  {
    id: 50,
    emoji: '🥊',
    name: 'Boxing Gloves',
    rarity: 'uncommon',
    caseType: 'sports',
    price: '$60',
  },
  { id: 51, emoji: '🥇', name: 'Gold Medal', rarity: 'rare', caseType: 'sports', price: '$96' },
  { id: 52, emoji: '🏆', name: 'Trophy', rarity: 'rare', caseType: 'sports', price: '$96' },
  { id: 53, emoji: '🎖️', name: 'Medal', rarity: 'epic', caseType: 'sports', price: '$600' },
  { id: 54, emoji: '👑', name: 'Crown', rarity: 'epic', caseType: 'sports', price: '$600' },
  {
    id: 55,
    emoji: '🏅',
    name: 'Award Medal',
    rarity: 'legendary',
    caseType: 'sports',
    price: '$1200',
  },
  { id: 56, emoji: '⚡', name: 'Lightning', rarity: 'gold', caseType: 'sports', price: '$1800' },
];

export const rarityGuide = [
  {
    id: 1,
    circleColor: GRADIENTS.casesCommon,
    text: 'Common',
    percents: '(55%)',
  },
  {
    id: 2,
    circleColor: GRADIENTS.casesUncommon,
    text: 'Uncommon',
    percents: '(25%)',
  },
  {
    id: 3,
    circleColor: GRADIENTS.casesRare,
    text: 'Rare',
    percents: '(12%)',
  },
  {
    id: 4,
    circleColor: GRADIENTS.casesEpic,
    text: 'Epic',
    percents: '(5%)',
  },
  {
    id: 5,
    circleColor: GRADIENTS.casesLegendary,
    text: 'Legendary',
    percents: '(2.5%)',
  },
  {
    id: 6,
    circleColor: GRADIENTS.casesGold,
    text: 'Gold',
    percents: '(0.5%)',
  },
];
