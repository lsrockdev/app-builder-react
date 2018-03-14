<<<<<<< HEAD
import styled from 'styled-components';
=======
import styled, { css } from 'styled-components';
>>>>>>> builder-page

export default styled.div`
  display: flex;
  > div {
    display: flex;
  }

  > div:first-child {
    > span {
      > div {
        cursor: initial !important;

        &:nth-child(2) {
          cursor: ew-resize !important;
        }
      }
    }
  }
<<<<<<< HEAD
=======

  ${({ reuse }) =>
    reuse &&
    css`
      flex: none !important;
    `};
>>>>>>> builder-page
`;
