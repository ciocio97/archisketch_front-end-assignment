import React from "react";
import { useState } from 'react';
import { 
  Container, 
  Header, 
  Button, 
  ImageInButton, 
  ButtonClose } from '../globalStyle';
import Modal from "../component/modal";
import styled from "styled-components";
import { saveAs } from 'file-saver';

interface ImageInfoProps {
  renderImageArr: any[],
  currImageIndex: number|null,
  handleImageClick: () => void,
  downloadImages: (index?:number|null) => void,
  deleteImage: (index?:number|null) => void,
}

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`
const ContainerImage = styled.div`
  width: 100vw;
  height: calc(100vh - 70px);
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`
const ImageRender = styled.img`
  width: 100%;
  max-height: calc(100vh - 53px);
`
const ContainerSlider = styled.div`
  position: absolute;
  top: 45%;
  width: 100vw;
  display: flex;
  justify-content: space-between;
`


function ImageInfoDetail ({ 
  renderImageArr, 
  currImageIndex,
  handleImageClick,
  downloadImages,
  deleteImage,
   }: ImageInfoProps) {

  const [currIndex, setCurrIndex] = useState<number|null>(currImageIndex);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const newRenderImageArr = renderImageArr.filter((el) => el._id);
  const isFirstImage = newRenderImageArr.indexOf(renderImageArr[currIndex || 0]) === 0
  const isLastImage = newRenderImageArr.indexOf(renderImageArr[currIndex || -1]) === newRenderImageArr.length - 1

  const handleNextButton = () => {
    setCurrIndex((prev) => {
      if(prev === renderImageArr.length - 1){
        return prev;
      } else {
        return (prev || 0) + 1; 
      }
    })
  };
  const handlePrevButton = () => {
    setCurrIndex((prev) => {
      if(prev === 0){
        return 0;
      } else {
        return (prev || 0) - 1;
      }
    });
  };

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      {isModalOpen ? 
          <Modal 
            deleteImage={deleteImage} 
            handleModal={handleModal}
            currIndex={currIndex || 0}
            handleImageClick={handleImageClick}
          /> 
          : 
          null
        }
      <Container>
        <Header>
          <ButtonContainer>
            <ButtonClose onClick={handleImageClick}>X</ButtonClose>
            <div>
              <Button onClick={() => downloadImages(currIndex)}>
                <ImageInButton src="img/downloadIcon.png"/>
                Download
              </Button>
              <Button onClick={handleModal}>
                <ImageInButton src="img/trashBinIcon.png"/>
              </Button>
            </div>
          </ButtonContainer>
        </Header>
      </Container>
      <ContainerImage>
          <ImageWrapper>
              <ContainerSlider>
                {isFirstImage ?
                  <div></div>
                : 
                  <Button onClick={handlePrevButton}>
                    <ImageInButton src="img/prevIcon.png"/>
                  </Button>  
                }
                {isLastImage ?
                  <div></div>
                :
                  <Button onClick={handleNextButton}>
                    <ImageInButton src="img/nextIcon.png"/>
                  </Button>
                }
              </ContainerSlider>
              {/* 서버와 연결되어 있지 않을 때 로컬에서 어떻게 처리해야되는지 더 고민 .. */}
              {renderImageArr[currIndex || 0]._id === null ?
                '이미 삭제된 렌더샷입니다.'
                :
                <ImageRender 
                  src={renderImageArr[currIndex || 0]._id} 
                  alt={`renderImage_${currImageIndex}`}/>
              }
          </ImageWrapper>
      </ContainerImage>
    </>
  );
}

export default ImageInfoDetail;