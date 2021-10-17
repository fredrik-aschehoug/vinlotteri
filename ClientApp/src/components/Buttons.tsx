import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: 2px solid AliceBlue;
  border-radius: 2px;
  background-color: AliceBlue;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    background-color: white;
  }
`;

export const SubmitButton: FunctionComponent  = ({ children }) => <StyledButton type="submit">{children}</StyledButton>;

export const Button: FunctionComponent<{ onClick: () => void }>  = ({ children, onClick }) => <StyledButton type="button" onClick={onClick}>{children}</StyledButton>;
