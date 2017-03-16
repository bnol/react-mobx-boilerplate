import styled from 'styled-components';

const LocaleLink = styled.a`
  color: ${(props) => props.active ? 'palevioletred !important' : 'inherit'};
  font-size: 13px
`;

export default LocaleLink;
