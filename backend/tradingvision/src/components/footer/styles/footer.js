import styled from 'styled-components';

export const Container = styled.div`
    padding: 30px 50px;
    background: radial-gradient(circle, rgba(55, 58, 109, 1) 0%, rgba(55, 58, 109, 1) 100%);
    font-family: 'Montserrat';
   
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    paddingLeft: 100px;
    
`
export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 30px;
`
export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    grid-gap: 25px;

    @media (max-width: 500px, max-height: 450px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`
export const Link = styled.a`
    color: #fff;
    margin-bottom: 20px;
    font-size: 16px;
    text-decoration: none;

    &:hover {
        color: #ff9c00;
        transition: 200ms ease-in;
    }
`
export const Title = styled.div`
    font-size: 19px;
    color: #fff;
    margin-bottom: 40px;
    font-weight: bold;

`

