
import styled from "styled-components";
import theme from "../../../styles/theme";

export const BasicInfoFormWrapper = styled.div`
width   :100%;
display :flex;
flex-direction:row;
justify-content:space-between;
margin-top: 3rem;

.ant-upload.ant-upload-select-picture-card {
    width: 15rem;
    height: 15rem;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;
    vertical-align: top;
    background-color: #fafafa;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.3s;
}

.w-100{
    width:100%;
    .flex-row{
        display:flex;
        flex-direction:row
    }
}
${theme.media.mobile}, ${theme.media.portrait} {
display :flex;
flex-direction:column;
align-items: center;
}
`
