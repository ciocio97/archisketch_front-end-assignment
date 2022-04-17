import React from "react";
import { Container, Header, Button, ImageInButton, ButtonClose } from './App';
import styled from "styled-components";

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`

function ImageInfoDetail () {
  return (
    <Container>
      <Header>
        <ButtonContainer>
          <ButtonClose>X</ButtonClose>
          <div>
            <Button>
              <ImageInButton src="img/downloadIcon.png"/>
              Download
            </Button>
            <Button>
              <ImageInButton src="img/trashBinIcon.png"/>
            </Button>
          </div>
        </ButtonContainer>
      </Header>
    </Container>
  );
}

export default ImageInfoDetail;