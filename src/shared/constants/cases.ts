import animalCaseImg from '../../assets/images/animal-case.png';
import foodCaseImg from '../../assets/images/food-case.png';
import spaceCaseImg from '../../assets/images/space-case.png';
import sportsCaseImg from '../../assets/images/sports-case.png';

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
