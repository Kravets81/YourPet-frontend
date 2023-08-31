import styled from '@emotion/styled';

export const WrapCategory = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 95px;
  gap: 12px;

  @media (min-width: 768px) {
    margin-bottom: 137px;
  }
`;

export const Label = styled.label`
  padding: 8px 16px;
  width: fit-content;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  line-height: calc(19 / 14);
  border-radius: 40px;
  background-color: ${props => (props.checked ? '#54adff' : '#CCE4FB')};
  color: ${props => (props.checked ? '#FEF9F9' : '#54ADFF')};
  transition: all 0.2s ease-in-out;
  will-change: transform;

  &:hover {
    transform: scale(1.05);
  }

  > input[type='radio'] {
    visibility: hidden;
    height: 0;
    width: 0;
  }
`;
