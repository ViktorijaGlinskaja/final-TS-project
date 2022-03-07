/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  useState, useRef, useMemo, useEffect,
} from 'react';
import ProfileService from 'services/profile-service';
import TinderCard from 'react-tinder-card';
import UserWithImages from 'types/user-with-images';
import { Box, Theme } from '@mui/material';
import Carousel from 'nuka-carousel';
import { styled } from '@mui/material/styles';
import SwipeButtons from './swipe-page-buttons';

const dimensionStyleMixin = (theme: Theme) => ({
  width: '70vw !important',
  height: '60vh !important',
  [theme.breakpoints.up('md')]: {
    width: '40vw !important',
  },
  [theme.breakpoints.up('lg')]: {
    width: '30vw !important',
  },
});

const StyledCarousel = styled(Carousel)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#fff',
  boxShadow: ' 0px 10px 53px 0px rgba(0, 0, 0, 0.3)',
  ...dimensionStyleMixin(theme),
}));

const CarouselImage = styled('img')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  objectPosition: 'center !important',
  backgroundPosition: 'center',
  objectFit: 'cover',
  ...dimensionStyleMixin(theme),
}));

const StyledTinderCard = styled(TinderCard)(() => ({
  position: 'absolute',
}));

const SwipeableCards: React.FC = () => {
  const [people, setPeople] = useState<UserWithImages[]>([]);

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
          <div style={{ position: 'relative' }}>
            <StyledCarousel>
              {person.images.map(({ src }) => (
                <CarouselImage
                  src={src}
                  key={src}
                  alt="profile"
                />
              ))}
            </StyledCarousel>
            <div style={{
              position: 'absolute', bottom: 0, left: 0,
            }}
            >
              <h3 style={{
                backgroundColor: 'rgba(17, 16, 15, 0.5)',
                margin: 0,
                paddingLeft: '15px',
                width: '100%',
                color: '#fff',
              }}
              >
                {person.name}

              </h3>
              <h4 style={{
                backgroundColor: 'rgba(17, 16, 15, 0.5)',
                margin: 0,
                paddingLeft: '15px',
                paddingBottom: '15px',
                color: '#fff',
              }}
              >
                {person.country}
              </h4>
              <h4 style={{
                backgroundColor: 'rgba(17, 16, 15, 0.5)',
                margin: 0,
                paddingLeft: '15px',
                paddingBottom: '25px',
                color: '#fff',
              }}
              >
                {person.about}
              </h4>
            </div>
          </div>
        </StyledTinderCard>
      ))}
      <SwipeButtons swipe={swipe} goBack={goBack} />
    </Box>
  );
};

export default SwipeableCards;
