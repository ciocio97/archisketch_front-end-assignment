import React, { useState, useEffect } from 'react';
import { RENDERING_URL } from './data/ResourceURL';
import axios from 'axios';
import data from './data/test.json';
import Modal from './component/modal';
import ImageInfoDetail from './page/ImageInfoDetail';
import GlobalStyle, {
  Container, 
  Header, 
  Button, 
  ImageInButton, 
  ButtonClose
} from './globalStyle';
import styled from 'styled-components';
import { saveAs } from 'file-saver';

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.8em;
  font-weight: 300;
  margin-left: 5px;
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
const ContainerSelectAll = styled.div`
  grid-row: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`
const SelectAllBox = styled.input`

`
const TextLight = styled.p`
  grid-row: 1;
  font-size: 0.8em;
  font-weight: 300;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`
const TextBold = styled.p`
  grid-row: 1;
  font-weight: 800;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`
const ContainerSelectBox = styled.div`
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
const ContainerImages = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
`
const ImageWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`
const ImageThumbnail = styled.div`
  position: relative;
  padding-top: 65%;
  overflow: hidden;
`
const ImageThumbnailCenter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translate(50%, 50%);
  -webkit-transform: translate(50%, 50%);
  -ms-transform: translate(50%, 50%);
`
const ImageRender = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  ${ImageWrapper}:hover & {
    filter: brightness(50%);
  }
`
const ImageCheckBox = styled.input`
  position: absolute;
  z-index: 10;
  top: 5%;
  left: 5%;
  opacity: 0;
  ${ImageWrapper}:hover & {
    opacity: 100%;
  }
  ${props => props.checked && `
    opacity: 100%;
  `}
`
const ContainerImageInfo = styled.div`
  position: absolute;
  z-index: 10;
  top: 5%;
  right: 3%;
  display: flex;
  flex-flow: column wrap;
  align-items: flex-end;
`
const ImageInfoButton = styled.button`
  width: 27px;
  height: 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  border: none;
  cursor: pointer;
  background-color: transparent;
  opacity: 0;
  ${ImageWrapper}:hover & {
    opacity: 100%;
  }
`
const Dot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 100px;
  background-color: #FFF;
  opacity: 0;
  ${ImageWrapper}:hover & {
    opacity: 100%;
  }
`
const ImageInfoBox = styled.div`
  border-radius: 3px;
  background-color: #FFF;
`
const ImageInfoBoxList = styled.div`
  font-size: 0.9em;
  font-weight: 300;
  padding: 8px 7px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

function App() {

  const [renderImageArr, setRenderImageArr] = useState<any[]>([]);
  const [currImageIndex, setCurrImageIndex] = useState<number|null>(null);
  const [selectedImageArr, setSelectedImageArr] = useState<number[]>([]);
  const [isImageInfoBoxOpen, setIsImageInfoBoxOpen] = useState<boolean>(false);
  const [isAllImageSelected, setIsAllImageSelected] = useState<boolean>(false);
  const [isClickedImage, setIsClickedImage] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  console.log(currImageIndex);

  const handleImageInfoBox = (index: number, boolean:boolean) => {
    setIsImageInfoBoxOpen(boolean);
    setCurrImageIndex(index);
  };

  const handleCheckingAllImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newArr: any[] = [];
    const isChecked = event.target.checked;
    if(isChecked){
      const length = renderImageArr?.length || 0;
      newArr = Array.from({ length }, (value, index) => index);
    }
    setSelectedImageArr(newArr);
    setIsAllImageSelected((prev) => !prev);
  };

  const handleCheckingImage = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const isChecked = event.target.checked;
    if(isChecked){
      setSelectedImageArr((prev) => {
        return prev?.concat(index);
      });
    } else {
      setSelectedImageArr((prev) => {
        const newArr = prev.slice();
        const indexForRemove = prev.indexOf(index);
        newArr.splice(indexForRemove, 1);
        return newArr;
      });
      setIsAllImageSelected(false);
    }
  };

  const uncheckedAllImages = () => {
    setSelectedImageArr([]);
  };

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const deleteImage = (index?: number|null) => {
    setRenderImageArr((prev) => {
      const newArr = prev.slice();
      if(isAllImageSelected){
        return [];
      } else if(typeof index === 'number') {
        newArr[index]._id = null;
        return newArr;
      } else {
        selectedImageArr.forEach((index) => {
          newArr[index]._id = null;
        })
      }
      return newArr;
    });
    setSelectedImageArr([]);
    setIsAllImageSelected(false);
  };

  const downloadImages = (index?:number|null) => {
    if(typeof index === 'number'){
      saveAs(`${renderImageArr[index]._id}`, `archisketch render image ${index}.png`);
    } else {
      selectedImageArr.forEach((index) => {
        saveAs(`${renderImageArr[index]._id}`, `archisketch render image ${index}.png`);
      })
    }
  };

  const handleImageClick = () => {
    setIsClickedImage((prev) => !prev);
  };

  useEffect(() => {
    // axios({
    //   method: 'get',
    //   url: RENDERING_URL
    // })
    // .then((res) => {
    //   if(res.status === 200){
    //     setRenderImageArr(res.data.renderings);
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
    setRenderImageArr(data.renderings);
  }, []);

  return (
    <>
      <GlobalStyle/>
      {isClickedImage ? 
        <ImageInfoDetail 
          renderImageArr={renderImageArr}
          currImageIndex={currImageIndex}
          handleImageClick={handleImageClick}
          downloadImages={downloadImages}
          deleteImage={deleteImage}
        />
        :
        <>
          {isModalOpen ? 
            <Modal 
              deleteImage={deleteImage} 
              handleModal={handleModal}
              handleImageClick={handleImageClick}
            /> 
            : 
            null
          }
          <GlobalStyle/>
          <Container>
            <Header>
              <ButtonClose>X</ButtonClose>
            </Header>
          </Container>
          <Main>
            <NavBar>
              {selectedImageArr.length ? 
                <ContainerSelectAll>
                  <TextLight>{selectedImageArr.length} render image(s) selected</TextLight>
                  <Label>
                    <SelectAllBox 
                      type="checkbox" 
                      onChange={handleCheckingAllImage}
                      checked={isAllImageSelected ? true : false}
                    />
                      Select All
                    </Label>
                </ContainerSelectAll>
              :
                <TextLight>{renderImageArr?.filter((el) => el._id).length} rendering(s)</TextLight>
              }
              <TextBold>Gallery</TextBold>
              {selectedImageArr.length ? 
                <ContainerSelectBox>
                  <Button onClick={() => downloadImages()}>
                    <ImageInButton src="img/downloadIcon.png"/>
                  </Button>
                  <Button onClick={handleModal}>
                    <ImageInButton src="img/trashBinIcon.png"/>
                  </Button>
                  <Button onClick={uncheckedAllImages}>Deselect</Button>
                </ContainerSelectBox> 
              :
                <ContainerSelectBox>
                  <SelectBox name="renderType">
                  </SelectBox>
                  <SelectBox name="resolutionType">
                  </SelectBox>
                </ContainerSelectBox>
              }
            </NavBar>
            <ContainerImages>
              {renderImageArr?.map((image, index) => {
                if(image._id){
                  return (
                    <ImageWrapper 
                      onMouseLeave={() => handleImageInfoBox(index, false)}
                      onMouseEnter={() => handleImageInfoBox(index, false)}
                    >
                      <ImageThumbnail>
                        <ImageCheckBox 
                          type="checkbox" 
                          onChange={(e) => handleCheckingImage(e, index)}
                          checked={
                            selectedImageArr.indexOf(index) !== -1 || 
                            isAllImageSelected ?
                            true : false
                          }
                          />
                        <ContainerImageInfo onClick={() => handleImageInfoBox(index, true)}> 
                          <ImageInfoButton>
                            <Dot/>
                            <Dot/>
                            <Dot/>
                          </ImageInfoButton>
                          {isImageInfoBoxOpen && currImageIndex === index ?  
                            <ImageInfoBox>
                              <ImageInfoBoxList onClick={() => downloadImages(index)}>
                                Download
                              </ImageInfoBoxList>
                              <ImageInfoBoxList onClick={() => deleteImage(index)}>
                                Delete
                              </ImageInfoBoxList>
                            </ImageInfoBox> 
                            :
                            null
                          }
                        </ContainerImageInfo>
                        <ImageThumbnailCenter>
                          <ImageRender src={image._id} onClick={handleImageClick}/>
                        </ImageThumbnailCenter>
                      </ImageThumbnail>
                    </ImageWrapper>
                  );
                } else return null;
              })}
            </ContainerImages>
          </Main>
        </> 
      }
    </>
  );
}

export default App;
