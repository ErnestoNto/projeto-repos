import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  width: 90%;
  max-width: 700px;
  background-color: #fafafa;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;

  input {
    flex: 1;
    border: 1px solid ${props => props.error ? ('#ff0045') : ('#ddd')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }
`;

//Criando animação do botão
const animate = keyframes`
  from{
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`

export const SubmitButton = styled.button.attrs((props) => ({
  type: "submit",
  disabled: props.loading,
}))`
  background-color: #0d2636;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${props => props.loading && 
    css`
        svg{
            animation: ${animate} 2s linear infinite;
        }
    `
    }
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li{
        padding: 15px 0;
        display: flex;
        align-items: center;
        font-size: 1rem;
        justify-content: space-between;
        
        & + li{
            border-top: 2px solid #0d2636;
        }

        a{
            text-decoration: none;
            color: #0d2636;

            :hover{
                opacity: .8;
            }
        }
    }
`

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`
    background-color: transparent;
    color: #0d2636;
    border: 0;
    padding: 8px 7px;
    outline: 0;
    border-radius: 4px;
`