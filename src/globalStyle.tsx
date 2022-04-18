import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    // margin: 0;
    overflow-x: hidden;
    box-sizing: border-box;
  }
`
export const Container = styled.div`
  width: 100vw;
`
export const Header = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(235, 235, 235, 0.8);
`
export const Button = styled.button`
  height: 30px;
  margin: 2px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.2);
`
export const ButtonClose = styled.button`
  width: 45px;
  height: 32px;
  border: none;
  border-radius: 5px;
  margin: 8px;
  font-weight: 700;
  cursor: pointer;
`
export const ImageInButton = styled.img`
  height: 100%;
`

export default GlobalStyle;