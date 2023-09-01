import React from 'react';
import { useModalContext } from '../Modals/Context/Context';
import {
  StyledButton1,
  StyledButton2,
  StyledButtonGroup,
  StyledCardWrapper,
  StyledCardWrapperH2Tab,
  StyledCardWrapperImgTab,
  StyledImage,
  StyledParDescription,
  StyledParText,
  StyledTable,
  StyledTableItemDynamic,
  StyledTableItemDynamicContact,
  StyledTableItemStatic,
  StyledTitle,
  StyledWrapperImage,
} from './CardMore.styled';
import { useAuth } from 'hooks';

function CardMore({id, card}) {
  const context = useModalContext();
const {user}= useAuth()

  const { toggle } = context;

  return (
    <StyledCardWrapper>
      <StyledCardWrapperImgTab>
        <StyledWrapperImage>
          <StyledImage
            src={card.imageURL}
            alt="Placeholder"
          />
          <StyledParDescription>{card.category}</StyledParDescription>
        </StyledWrapperImage>

        <StyledCardWrapperH2Tab>
          <StyledTitle>{card.category}Сute dog looking for a home</StyledTitle>
          <StyledTable>
            <tbody>
              <tr>
                <StyledTableItemStatic>Name:</StyledTableItemStatic>
                <StyledTableItemDynamic>{card.name}</StyledTableItemDynamic>
              </tr>
              <tr>
                <StyledTableItemStatic>Birthday:</StyledTableItemStatic>
                <StyledTableItemDynamic>2{card.date}</StyledTableItemDynamic>
              </tr>
              <tr>
                <StyledTableItemStatic>Type:</StyledTableItemStatic>
                <StyledTableItemDynamic>{card.type}</StyledTableItemDynamic>
              </tr>
              <tr>
                <StyledTableItemStatic>The sex:</StyledTableItemStatic>
                <StyledTableItemDynamic>{card.sex}</StyledTableItemDynamic>
              </tr>
              <tr>
                <StyledTableItemStatic>Email:</StyledTableItemStatic>
                <StyledTableItemDynamicContact>
                 { user.email}
                </StyledTableItemDynamicContact>
              </tr>
              <tr>
                <StyledTableItemStatic>Phone:</StyledTableItemStatic>
                <StyledTableItemDynamicContact>
                {user.phome === true?
                  user.phone : "+38 000 000 00 00" 
                }

                </StyledTableItemDynamicContact>
              </tr>
            </tbody>
          </StyledTable>
        </StyledCardWrapperH2Tab>
      </StyledCardWrapperImgTab>

      <StyledParText>
        Comments: {card.comment}
      </StyledParText>

      <StyledButtonGroup>
        <StyledButton1 onClick={() => toggle()}>Contact</StyledButton1>
        <StyledButton2 onClick={() => toggle()}>Add to</StyledButton2>
      </StyledButtonGroup>
    </StyledCardWrapper>
  );
}

export default CardMore;
