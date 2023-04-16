import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loading = styled.div`
    height: 100vh;
    color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Container = styled.article`
    max-width: 700px;
    background-color: #fafafa;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, .2);
    padding: 30px;
    margin: 80px auto;
`

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1{
        font-size: 30px;
        color: #0d2647;
    }

    p{
        margin-top: 5px;
        font-size: 1rem;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }
` 

export const BackButton = styled(Link)`
    border: 0;
    outline: 0;
    background: transparent;
`

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li{
        display: flex;
        padding: 15px 10px;
    }

    & + li{
        margin-top: 12px;
    }

    img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #0d2636;
    }

    div{
        flex: 1;
        margin-left: 12px;

        p{
            margin-top: 10px;
            font-size: 12px;
            color: #000;
        }
    }

    strong{
        font-size: 1.2rem;

        a{
            text-decoration: none;
            color: #222;
            transition: .3s ease-in;

            &:hover{
                color: #0071db;
            }
        }

        span{
            background-color: #222;
            color: #fafafa;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            padding: 5px 7px;
            margin-left: 10px;
        }
    }
`

export const PageActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button{
        outline: 0;
        border: 0;
        background-color: #222;
        color: #fafafa;
        padding: 5px 10px;
        border-radius: 4px;

        &:disabled{
            cursor: not-allowed;
            opacity: .5;
        }
    }
`

export const Filter = styled.div`
    margin: 20px auto;
    display: flex;
    justify-content: space-between;

    button{
        outline: 0;
        border: 0;
        background-color: #222;
        color: #fafafa;
        padding: 5px 10px;
        border-radius: 4px;

        &:nth-child(${props => props.active + 1}){
            background-color: #0071db;
            color: #fafafa;
        }
    }
`