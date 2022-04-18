import React from "react";
import styled from "styled-components";
import { Button } from '../globalStyle';

interface ModalProps {
  deleteImage: (index?:number|null) => void,
  handleModal: () => void,
  currIndex?: number,
  handleImageClick: () => void,
}

const BackgroundModal = styled.div`
  position: fixed;
  z-index: 50;
  width: 100vw;
  height: 100vh;
`
const ContainerModal = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`
const ModalBox = styled.div`
  min-width: 300px;
  min-height: 200px;
  border-radius: 10px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
`
const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`

function Modal ({ deleteImage, handleModal, currIndex, handleImageClick }: ModalProps) {
  
  const handleDeleteButton = () => {
    if(typeof currIndex === 'number'){
      deleteImage(currIndex);
      handleImageClick();
    } else {
      deleteImage();
    }
    handleModal();
  }
  
  return (
    <>
      <BackgroundModal>
        <ContainerModal>
          <ModalBox>
            해당 이미지를 삭제하시겠습니까?
            <ContainerButton>
              <Button onClick={handleDeleteButton}>확인</Button>
              <Button onClick={handleModal}>돌아가기</Button>
            </ContainerButton>
          </ModalBox>
        </ContainerModal>
      </BackgroundModal>
    </>
  );
}

export default Modal;