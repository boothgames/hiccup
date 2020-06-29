import styled from 'styled-components';

import bag from '../../images/bag.png';
import filter from '../../images/filter.svg';

export const Rules = styled.div`
  position: absolute;
  top: 23%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  color: #333;
  padding: 5px;
  width: 60%;
  border-radius: 10px;
  text-align: center;
  border-style:solid;

  @media screen and (max-width: 991px) {
    font-size: 1.6rem;
    padding: 1rem;
    width: 70%;
  }

  @media screen and (max-height: 320px) {
    font-size: 1rem;
    width: 45%;
  }

  @media screen and (max-height: 213px) {
    height: 70%;
    width: auto;
  }
`;
export const Container = styled.div`
  grid-area: cart;
  // background-image: url(${bag});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding-top: 15%;
  position: relative;
  width: 100%;
  float: left;
  margin: 0;
`;

export const Task = styled.div`
  position: relative;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(5, minmax(15%, 1fr));
  grid-template-rows: repeat(2, minmax(15%, 1fr));
  grid-gap: 5%;
  min-width: 110px;
  padding-top: 40px;
  padding-bottom: 40px;
  // margin-left: -20px;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    
    border-radius: 3px;
    border: solid 1px #c8c8c8;
    background-color: #f8f8f8;
    
    img {
      width: 100%;
      height: 100%;
      min-width: 20px;
      min-height: 20px;
    }
    &.gray {
      filter: url(${filter}#grayscale);
      filter: gray;
      -webkit-filter: grayscale(1);
    }
  }
`;
