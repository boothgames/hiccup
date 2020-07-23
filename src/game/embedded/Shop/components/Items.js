/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

import { DragDropContainer } from 'react-drag-drop-container';
import { useImagesContext } from '../../../contexts/ImagesContext';

import { bottomOptions } from '../config';


const Items = styled.div`
  display: flex;
  padding: 10px;
  padding-top: 40px;
  height: 100%;
  @media screen and (max-width: 768px) and (orientation: portrait) {
    height: 15%;
    min-height: 30px;
    width: 100%;
  }
  img {
    width: 150px;
    height: 100px;
    cursor: pointer;
    //width: 100%;
    //height: 100%;
    object-fit: contain;
    padding: 20px;
    // border-image: url(./line.png) 50 round;
  }
`;

const ItemsBottom = styled(Items)`
  grid-area: items-bottom;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  @media screen and (min-width: 768px) and (orientation: portrait) {
    //width: 100%;
  }
  display: -webkit-box;
  flex-wrap: wrap;
  -webkit-background-clip: padding-box;
  // -webkit-border-radius: 12px;
  // -webkit-background-clip: padding-box;
`;

export default () => {
  const { images } = useImagesContext();

  return (
    <ItemsBottom>
      {bottomOptions.map((name, i) => (
        <DragDropContainer key={i} targetKey="foo" dragData={name}>
          <div key={i}>
            <img
              style={{ flex: 1, height: undefined, width: undefined }}
              src={images[`${name  }.png`]}
              alt={name}
            />
          </div>
        </DragDropContainer>
      ))}
    </ItemsBottom>
  );
};
