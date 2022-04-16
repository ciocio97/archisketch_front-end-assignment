import React, { useState, useEffect } from 'react';
import { RENDERING_URL } from './data/ResourceURL';
import styled from 'styled-components';
import axios from 'axios';
import './App.css';

const Container = styled.div`
  width: 100vw;
`
const Header = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(235, 235, 235, 0.8);
`
const Button_close = styled.button`
  width: 45px;
  height: 32px;
  border: none;
  border-radius: 5px;
  margin: 8px;
  font-weight: 700;
  cursor: pointer;
`
const Main = styled.div`
  width: inherit;
  height: auto;
  padding: 0 20px;
`
const NavBar = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, lfr);
  grid-gap: 5px;
  grid-auto-rows: minmax(30px, auto);
`
const Text_light = styled.p`
  grid-row: 1;
  font-size: 0.8em;
  font-weight: 300;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`
const Text_bold = styled.p`
  grid-row: 1;
  font-weight: 800;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`
const Container_selectBox = styled.div`
  grid-row: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
`
const SelectBox = styled.select`
  width: 50px;
  margin-right: 5px;
`
const Container_images = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
`
const Image_hover = styled.div`
  width: 100%;
  cursor: pointer;
`
const Image_wrapper = styled.div`
  width: 100%;
  cursor: pointer;
`
const Image_thumbnail = styled.div`
  position: relative;
  padding-top: 65%;
  overflow: hidden;
`
const Image_thumbnail_center = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translate(50%, 50%);
  -webkit-transform: translate(50%, 50%);
  -ms-transform: translate(50%, 50%);
`
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`


function App() {

  const [renderImageArr, setRenderImageArr] = useState<any[]|null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number|null>(null);

  useEffect(() => {
    axios({
      method: 'get',
      url: RENDERING_URL
    })
    .then((res) => {
      if(res.status === 200){
        setRenderImageArr(res.data.renderings);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  });

  return (
    <>
      <Container>
        <Header>
          <Button_close>X</Button_close>
        </Header>
      </Container>
      <Main>
        <NavBar>
          <Text_light>{renderImageArr?.length} 개의 렌더샷</Text_light>
          <Text_bold>갤러리</Text_bold>
          <Container_selectBox>
            <SelectBox name="모든 렌더샷"></SelectBox>
            <SelectBox name="모든 화질"></SelectBox>
          </Container_selectBox>
        </NavBar>
        <Container_images>
          {renderImageArr?.map((image, index) => {
            return (
              <Image_wrapper 
                onMouseEnter={() => setSelectedImageIndex(index)}
                onMouseLeave={() => setSelectedImageIndex(null)}
              >
                <Image_thumbnail>
                  <Image_thumbnail_center>
                    <Image src={image._id}/>
                  </Image_thumbnail_center>
                </Image_thumbnail>
              </Image_wrapper>
            );
          })}
        </Container_images>
      </Main>
    </>
  );
}

export default App;
