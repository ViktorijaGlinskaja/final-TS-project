/* eslint-disable -- 
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState, useRef, useMemo, useEffect,
} from 'react';
import ProfileService from 'services/profile-service';
import TinderCard from 'react-tinder-card';
import UserWithImages from 'types/user-with-images';
import { Box } from '@mui/material';
import Carousel from 'nuka-carousel';
import { styled } from '@mui/material/styles';
import SwipeButtons from './swipe-page-buttons';

const StyledCarousel = styled(Carousel)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#fff',
  width: '70vw !important',
  height: '60vh !important',
  objectPosition: 'center !important',
  backgroundPosition: 'center',
  boxShadow: ' 0px 10px 53px 0px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.up('md')]: {
    width: '40vw !important',
  },
  [theme.breakpoints.up('lg')]: {
    width: '30vw !important',
  },
}));

const StyledTinderCard = styled(TinderCard)(() => ({
  position: 'absolute',
}));

const SwipeableCards: React.FC = () => {

  const [people, setPeople] = useState<UserWithImages[]>([]);

  console.log(people);

  useEffect(() => {
    (async () => {
      const fetchedPeople = await ProfileService.getUserData();
      setPeople(fetchedPeople);
    })();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(people.length - 1);
  const [lastDirection, setLastDirection] = useState('');
  const currentIndexRef = useRef(currentIndex);

  const childRefs: React.RefObject<any>[] = useMemo(
    () => Array(people.length)
      .fill(0)
      .map((i) => React.createRef()),
    [people.length],
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < people.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, _nameToDelete: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: any, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    if (currentIndexRef.current >= idx) childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir: any) => {
    if (canSwipe && currentIndex < people.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5vh' }}>
      {people.map((person, index) => (
        <StyledTinderCard
          ref={childRefs[index]}
          key={person.name}
          preventSwipe={['up', 'down']}
          onSwipe={(dir) => swiped(dir, person.name, index)}
          onCardLeftScreen={() => outOfFrame(person.name, index)}
        >
          <div>
            <StyledCarousel>
              {person.images.map(({ src }) => (
                <img
                  src={src}
                  key={src}
                  alt="profile"
                />
              ))}
            </StyledCarousel>
            <h3 style={{
              position: 'absolute',
              bottom: 20,
              margin: '10px',
              color: '#fff',
            }}
            >
              {person.name}

            </h3>
            <h4 style={{
              position: 'absolute',
              bottom: 0,
              margin: '10px',
              color: '#fff',
            }}
            >
              {person.about}

            </h4>
          </div>
        </StyledTinderCard>
      ))}
      <SwipeButtons swipe={swipe} goBack={goBack} />
    </Box>
  );
};

export default SwipeableCards;
